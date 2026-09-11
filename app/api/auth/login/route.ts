import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/src/prisma/db";
import { createSession } from "@/src/prisma/session";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email and password are required.",
                },
                { status: 400 }
            );
        }

        const user = await db.orm.public.User
            .where((user) => user.email.eq(email))
            .first();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid email or password.",
                },
                { status: 401 }
            );
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordMatches) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid email or password.",
                },
                { status: 401 }
            );
        }

        await createSession(user.id);

        return NextResponse.json(
            {
                success: true,
                message: "Signed in successfully.",
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    name: user.name,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong. Please try again.",
            },
            { status: 500 }
        );
    }
}