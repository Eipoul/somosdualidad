import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ADMIN_HOSTNAMES = new Set([
  "admin.somosdualidad.com",
  "admin.localhost",
  "admin.localhost:3000",
]);

function isAdminHost(hostname: string) {
  return ADMIN_HOSTNAMES.has(hostname) || hostname.startsWith("admin.localhost");
}

type CookiesToSet = { name: string; value: string; options?: object }[];

function makeSupabaseClient(request: NextRequest, response: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet: CookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(
              name,
              value,
              options as Parameters<typeof response.cookies.set>[2]
            );
          });
        },
      },
    }
  );
}

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // ── Public site ──────────────────────────────────────────────────────
  if (!isAdminHost(hostname)) {
    // Refresh Supabase session cookies so they don't expire mid-session.
    const res = NextResponse.next();
    makeSupabaseClient(request, res).auth.getUser().catch(() => {});
    return res;
  }

  // ── Admin subdomain (admin.somosdualidad.com) ────────────────────────
  //
  // URL mapping (subdomain path → internal Next.js path):
  //   /          → redirect to /login  (spec requirement)
  //   /login     → /admin/login
  //   /dashboard → /admin/dashboard
  //   /episodes  → /admin/episodes
  //   …etc.

  const isLoginPath = pathname === "/login";

  // Root on admin subdomain → always redirect to login.
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Build the internal rewrite target.
  const internalPath = `/admin${pathname}`;
  const rewriteUrl = new URL(internalPath, request.url);
  const response = NextResponse.rewrite(rewriteUrl);

  // Check Supabase auth session (session cookies travel with the request).
  const supabase = makeSupabaseClient(request, response);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Unauthenticated and not already on the login page → send to /login.
  if (!user && !isLoginPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Already authenticated and hitting /login → send to dashboard.
  if (user && isLoginPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Match everything except Next.js internals and static assets.
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
