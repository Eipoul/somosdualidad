import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

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
