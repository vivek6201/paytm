import { NextResponse, type NextRequest } from "next/server";
import db from "@repo/db/client"
import { hash } from "bcryptjs";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const reqBody: {
        name: string;
        email: string;
        phone: string;
        password: string;
    } = await req.json();

    try {
        const user = await db.user.findUnique({
            where: { phone: reqBody.phone }
        })

        //checking user exists
        if (user) {
            return NextResponse.json({
                message: "User already exists"
            }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json({
            message: "Failed to check user"
        })
    }

    //creating a hash of the pass
    const hashedPass = await hash(reqBody.password, 10);

    try {
        const newUser = await db.user.create({
            data: {
                name: reqBody.name,
                email: reqBody.email,
                phone: reqBody.phone,
                password: hashedPass
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true
            }
        })

        return NextResponse.json({
            message: "User created Successfully",
            user: newUser
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            message: "Failed to create db entry"
        }, { status: 500 })
    }
}