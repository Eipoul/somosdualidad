import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page is outside this layout, so redirecting here is always safe.
  // On the admin subdomain middleware handles this first; this is a fallback
  // for direct /admin/* access on the public domain.
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-cream-100">
      <AdminSidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
