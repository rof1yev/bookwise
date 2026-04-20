import { ReactNode } from "react";
import "@/styles/admin.css";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session?.user?.id as string))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  console.log("isAdmin:", isAdmin, "session:", session);

  if (!isAdmin) redirect("/");

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
