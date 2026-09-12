import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            title,
            subtitle,
            price,
            tag,
            type,
            action,
            href,
            imageUrl,
        } = body;

        if (!title || !subtitle || !type || !action) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Title, subtitle, type, and action are required.",
                },
                { status: 400 }
            );
        }

        const material = await db.orm.public.Material.create({
            title,
            subtitle,
            price: price || null,
            tag: tag || null,
            type,
            action,
            href: href || null,
            imageUrl: imageUrl || null,
        });
        return NextResponse.json(
            {
                success: true,
                message: "Material added successfully.",
                material,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create material error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to add material.",
            },
            { status: 500 }
        );
    }
}