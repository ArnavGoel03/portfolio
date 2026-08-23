import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";

// This file was src/middleware.ts. Next 16 renamed the convention to `proxy`
// and warns on every build until the file is renamed with it. Worth being
// precise about, because the near miss has already cost this site two days of
// live time: the failure in August was a file still named middleware.ts that
// exported `proxy`, which builds nothing and fails in 19 seconds. The name of
// the file and the name of the export have to move together, and they do
// here: proxy.ts exporting `proxy`.
const CANONICAL_HOST = new URL(SITE_URL).host;

export async function proxy(request: NextRequest) {
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

/**
 * Constant-time string compare for the edge runtime.
 *
 * node:crypto and its timingSafeEqual are not available here, so both sides
 * are hashed first and the digests compared byte by byte with no early
 * return. Hashing is what makes the comparison fixed-length: comparing the
 * raw strings would leak their length through the loop bound even if the loop
 * itself did not branch.
 */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [digestA, digestB] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)),
    crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);
  const viewA = new Uint8Array(digestA);
  const viewB = new Uint8Array(digestB);
  let diff = 0;
  for (let i = 0; i < viewA.length; i++) {
    diff |= viewA[i] ^ viewB[i];
  }
  return diff === 0;
}

async function guardPrivate(request: NextRequest) {
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
    // Both compared every time, and the results combined afterwards, so a
    // wrong username costs exactly as long as a wrong password.
    const userOk = await safeEqual(gotUser, expUser);
    const passOk = await safeEqual(gotPass, expPass);
    if (!userOk || !passOk) {
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
