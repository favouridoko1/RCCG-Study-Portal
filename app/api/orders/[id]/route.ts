import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";
import { getCurrentUser } from "@/src/prisma/session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const orderId = Number(id);

    if (!orderId || Number.isNaN(orderId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order ID.",
        },
        { status: 400 }
      );
    }

    const order = await db.orm.public.Order.first({
      id: orderId,
      userId: user.id,
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load order.",
      },
      { status: 500 }
    );
  }
}