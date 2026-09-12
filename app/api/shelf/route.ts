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
      .include("items", (items) =>
        items.include("material")
      )
      .where({
        userId: user.id,
      })
      .all();

    const materials = orders.flatMap((order) =>
      order.items.map((item) => ({
        id: item.material.id,
        title: item.material.title,
        subtitle: item.material.subtitle,
        type: item.material.type,
        href: item.material.href,
        imageUrl: item.material.imageUrl,
        purchasedAt: order.createdAt,
      }))
    );

    const uniqueMaterials = materials.filter(
      (material, index, self) =>
        index ===
        self.findIndex((item) => item.id === material.id)
    );

    return NextResponse.json({
      success: true,
      materials: uniqueMaterials,
    });
  } catch (error) {
    console.error("Get shelf error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load your shelf.",
      },
      { status: 500 }
    );
  }
}