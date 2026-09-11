import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET() {
  try {
    const materials = await db.orm.public.Material
      .orderBy((material) => material.createdAt.desc())
      .all();

    return NextResponse.json({
      success: true,
      materials,
    });
  } catch (error) {
    console.error("Home API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load home data.",
      },
      { status: 500 }
    );
  }
}