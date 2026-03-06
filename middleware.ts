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

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // ── Public site ─────────────────────────────────────────────────────
  // Refresh Supabase session cookies so they don't expire mid-session.
  if (!isAdminHost(hostname)) {
    return refreshSession(request, NextResponse.next());
  }

  // ── Admin subdomain ──────────────────────────────────────────────────
  // Map subdomain paths → internal /admin/* paths:
  //   /           → /admin/dashboard
  //   /login      → /admin/login
  //   /episodes   → /admin/episodes  …etc.
  const isLoginPath = pathname === "/login";
  const internalPath =
    pathname === "/" ? "/admin/dashboard" : `/admin${pathname}`;

  // Pre-build the rewrite response so we can attach refreshed cookies.
  const rewriteUrl = new URL(internalPath, request.url);
  const response = NextResponse.rewrite(rewriteUrl);

  // Check Supabase auth session.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet: { name: string; value: string; options?: object }[]) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options as Parameters<typeof response.cookies.set>[2]);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not authenticated → send to /login (stays on admin subdomain).
  if (!user && !isLoginPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Already authenticated → skip the login page.
  if (user && isLoginPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

// Refreshes Supabase session tokens on the public site so cookies
// stay up to date across RSC navigations.
function refreshSession(request: NextRequest, response: NextResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet: { name: string; value: string; options?: object }[]) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options as Parameters<typeof response.cookies.set>[2]);
          });
        },
      },
    }
  );
  // Trigger token refresh side-effect (fire-and-forget is fine here).
  supabase.auth.getUser().catch(() => {});
  return response;
}

export const config = {
  matcher: [
    // Run on all paths except Next.js internals and static files.
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
