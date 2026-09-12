import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

type RouteContext = {
    params: Promise<{
        slug: string;
    }>;
};

export async function GET(
    _request: Request,
    { params }: RouteContext
) {
    try {
        const { slug } = await params;

        const material = await db.orm.public.Material.first({
            slug,
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

        return NextResponse.json({
            success: true,
            material,
        });
    } catch (error) {
        console.error("Get material error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to load material.",
            },
            { status: 500 }
        );
    }
}
