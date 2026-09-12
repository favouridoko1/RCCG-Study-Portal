import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";
import { getCurrentUser } from "@/src/prisma/session";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const orders = await db.orm.public.Order
      .include("items")
      .where({
        userId: user.id,
      })
      .all();

    const sortedOrders = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      orders: sortedOrders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load orders.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message:
            "First name, last name, email, and phone are required.",
        },
        { status: 400 }
      );
    }

    const cart = await db.orm.public.Cart
      .include("items", (items) =>
        items.include("material")
      )
      .first({
        userId: user.id,
      });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Your cart is empty.",
        },
        { status: 400 }
      );
    }

    let total = 0;

    for (const item of cart.items) {
      const price = Number(
        item.material.price?.replace(/[^\d.]/g, "") ?? ""
      );

      if (!Number.isNaN(price)) {
        total += price * item.quantity;
      }
    }

    const order = await db.orm.public.Order.create({
      userId: user.id,
      status: "pending",
      firstName,
      lastName,
      email,
      phone,
      total: total.toFixed(2),
    });

    for (const item of cart.items) {
      await db.orm.public.OrderItem.create({
        orderId: order.id,
        materialId: item.material.id,
        title: item.material.title,
        price: item.material.price ?? "",
        quantity: item.quantity,
      });
    }

    // Clear the database cart after the order has been created.
    for (const item of cart.items) {
      await db.orm.public.CartItem
        .where({
          id: item.id,
        })
        .delete();
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully.",
        order: {
          id: order.id,
          status: order.status,
          total: order.total,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create order.",
      },
      { status: 500 }
    );
  }
}