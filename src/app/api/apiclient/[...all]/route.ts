import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

const RESOURCE_SERVER_URL = process.env.RESOURCE_SERVER_URL!;
const SECRET = process.env.NEXTAUTH_SECRET!;

export async function GET(req: NextRequest) {
    const path = getPathFromRequest(req);
    return handleProxy(req, path);
}

export async function POST(req: NextRequest) {
    const path = getPathFromRequest(req);
    return handleProxy(req, path);
}

export async function PUT(req: NextRequest) {
    const path = getPathFromRequest(req);
    return handleProxy(req, path);
}

export async function DELETE(req: NextRequest) {
    const path = getPathFromRequest(req);
    return handleProxy(req, path);
}

function getPathFromRequest(req: NextRequest): string[] {
    const pathname = new URL(req.url).pathname;
    const pathAfterApi = pathname.split("/").slice(3);
    return pathAfterApi;
}

async function handleProxy(req: NextRequest, path: string[]) {
    const token = await getToken({req, secret: SECRET});
    const url = `${RESOURCE_SERVER_URL}/${path.join("/")}`;

    const method = req.method;

    const headers = new Headers(req.headers);
    headers.set("Authorization", `Bearer ${token?.access_token}`);
    headers.set("Content-Type", "application/json");

    const body = method !== "GET" && method !== "HEAD" ? await req.text() : undefined;

    const response = await fetch(url, {
        method,
        headers,
        body,
    });

    const responseBody = await response.text();

    return new NextResponse(responseBody, {
        status: response.status,
        headers: {
            "Content-Type": response.headers.get("Content-Type") || "application/json",
        },
    });
}
