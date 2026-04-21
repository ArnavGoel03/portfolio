import { NextRequest, NextResponse } from "next/server";

// Basic-auth guard for /private/* routes. Set PRIVATE_AUTH in Vercel env as
// "username:password" (e.g. "arnav:yourlongsecretpassword"). If the env var is
// not set, all /private/* routes return 503 — fail-closed by design.
export function middleware(request: NextRequest) {
  const expected = process.env.PRIVATE_AUTH;

  if (!expected) {
    return new NextResponse(
      "Private routes disabled: set PRIVATE_AUTH env var.",
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return new NextResponse("Authentication required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Arnav private area"',
      },
    });
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
      return new NextResponse("Invalid credentials.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Arnav private area"',
        },
      });
    }
  } catch {
    return new NextResponse("Invalid credentials.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Arnav private area"',
      },
    });
  }

  const res = NextResponse.next();
  // Make sure browsers and CDNs don't cache the private response
  res.headers.set("Cache-Control", "no-store, private, max-age=0");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  matcher: ["/private/:path*"],
};
