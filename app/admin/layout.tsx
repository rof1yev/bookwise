import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/services/user";
import "@/styles/admin.css";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  const user = await getCurrentUser(session?.user?.id as string);
  if (user.role !== "ADMIN") redirect("/");

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar />
      <div className="admin-container">
        <Header />
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
