import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase-server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // On admin subdomain, middleware rewrites /login → /admin/login,
    // so we redirect to /login. On the public domain, use the full path.
    const host = headers().get("host") ?? "";
    const isAdminSubdomain = host.startsWith("admin.");
    redirect(isAdminSubdomain ? "/login" : "/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-cream-100">
      <AdminSidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
