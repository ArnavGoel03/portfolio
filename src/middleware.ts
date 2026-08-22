import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "arnavgoel.dev";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname, search } = request.nextUrl;

  if (host.endsWith(".vercel.app")) {
    const target = new URL(`https://${CANONICAL_HOST}${pathname}${search}`);
    return NextResponse.redirect(target, 308);
  }

  if (pathname.startsWith("/private")) {
    return guardPrivate(request);
  }

  return NextResponse.next();
}

function guardPrivate(request: NextRequest) {
  const expected = process.env.PRIVATE_AUTH;
  if (!expected) {
    return new NextResponse(
      "Private routes disabled: set PRIVATE_AUTH env var.",
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return unauthorized();
  }

  try {
    const decoded = atob(authHeader.slice("Basic ".length).trim());
    const expectedSep = expected.indexOf(":");
    const decodedSep = decoded.indexOf(":");
    if (expectedSep < 0 || decodedSep < 0) {
      throw new Error("Bad credential format");
    }
    const expUser = expected.slice(0, expectedSep);
    const expPass = expected.slice(expectedSep + 1);
    const gotUser = decoded.slice(0, decodedSep);
    const gotPass = decoded.slice(decodedSep + 1);
    if (gotUser !== expUser || gotPass !== expPass) {
      return unauthorized();
    }
  } catch {
    return unauthorized();
  }

  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, private, max-age=0");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Arnav private area"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|txt|xml|ico|json)).*)"],
};
