import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";
import { getCurrentUser } from "@/src/prisma/session";

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const materialId = Number(searchParams.get("materialId"));

    if (!materialId || Number.isNaN(materialId)) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid material ID is required.",
        },
        { status: 400 }
      );
    }
    const progress = await db.orm.public.ReadingProgress.first({
      userId: user.id,
      materialId,
    });

    return NextResponse.json({
      success: true,
      progress: progress ?? null,
    });
  } catch (error) {
    console.error("Get reading progress error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load reading progress.",
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
    const currentPage = Number(body.currentPage);
    const totalPages = Number(body.totalPages);

    if (
      !materialId ||
      Number.isNaN(materialId) ||
      !currentPage ||
      Number.isNaN(currentPage) ||
      !totalPages ||
      Number.isNaN(totalPages)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Material ID, current page, and total pages are required.",
        },
        { status: 400 }
      );
    }

    if (currentPage < 1 || totalPages < 1 || currentPage > totalPages) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid reading progress.",
        },
        { status: 400 }
      );
    }

    const progress = Math.round(
      (currentPage / totalPages) * 100
    );

    const existingProgress =
      await db.orm.public.ReadingProgress.first({
        userId: user.id,
        materialId,
      });

    let savedProgress;

    if (existingProgress) {
      savedProgress = await db.orm.public.ReadingProgress
        .where({
          id: existingProgress.id,
        })
        .update({
          currentPage,
          totalPages,
          progress,
          lastReadAt: new Date().toISOString(),
        });
    } else {
      savedProgress =
        await db.orm.public.ReadingProgress.create({
          userId: user.id,
          materialId,
          currentPage,
          totalPages,
          progress,
          lastReadAt: new Date().toISOString(),
        });
    }

    return NextResponse.json({
      success: true,
      message: "Reading progress saved successfully.",
      progress: savedProgress,
    });
  } catch (error) {
    console.error("Save reading progress error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save reading progress.",
      },
      { status: 500 }
    );
  }
}