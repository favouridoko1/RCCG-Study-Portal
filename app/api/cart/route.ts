import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/prisma/session";
import { db } from "@/src/prisma/db";

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

    const cart = await db.orm.public.Cart
      .include("items", (items) =>
        items.include("material")
      )
      .first({
        userId: user.id,
      });

    return NextResponse.json({
      success: true,
      cart: cart ?? {
        id: null,
        userId: user.id,
        items: [],
      },
    });
  } catch (error) {
    console.error("Get cart error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load cart.",
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
        const materialId = Number(body.materialId);

        if (!materialId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Material ID is required.",
                },
                { status: 400 }
            );
        }

        const material = await db.orm.public.Material.first({
            id: materialId,
        });

        if (!material) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Material not found.",
                },
                { status: 404 }
            );
        }

        let cart = await db.orm.public.Cart.first({
            userId: user.id,
        });

        if (!cart) {
            cart = await db.orm.public.Cart.create({
                userId: user.id,
            });
        }

        const existingItem = await db.orm.public.CartItem.first({
            cartId: cart.id,
            materialId: material.id,
        });

        if (existingItem) {
            return NextResponse.json({
                success: true,
                message: "Material is already in your cart.",
                item: existingItem,
            });
        }

        const cartItem = await db.orm.public.CartItem.create({
            cartId: cart.id,
            materialId: material.id,
            quantity: 1,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Material added to cart.",
                item: cartItem,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Add to cart error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to add material to cart.",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
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
    const materialId = Number(body.materialId);

    if (!materialId) {
      return NextResponse.json(
        {
          success: false,
          message: "Material ID is required.",
        },
        { status: 400 }
      );
    }

    const cart = await db.orm.public.Cart.first({
      userId: user.id,
    });

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart not found.",
        },
        { status: 404 }
      );
    }

    const cartItem = await db.orm.public.CartItem.first({
      cartId: cart.id,
      materialId,
    });

    if (!cartItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart item not found.",
        },
        { status: 404 }
      );
    }

    await db.orm.public.CartItem.where({ id: cartItem.id }).delete();

    return NextResponse.json({
      success: true,
      message: "Material removed from cart.",
    });
  } catch (error) {
    console.error("Remove from cart error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to remove material from cart.",
      },
      { status: 500 }
    );
  }
}