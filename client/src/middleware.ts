import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const VERIFY_ENDPOINT = process.env.NEXT_PUBLIC_API_URI + "/verify"; 

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const protectedRoutes = ["/dashboard", "/profile"];

    if (protectedRoutes.includes(req.nextUrl.pathname)) {
        if (!token) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        try {
            const response = await axios.post(
                VERIFY_ENDPOINT,
                {},
                {
                    headers: {
                        "Authorization": `${token}`,
                    },
                }
            );

            if (!response.data.success) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch (error) {
            console.error("JWT Verification Error:", error);
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/profile"], // Protect these routes
};
