import { ReactNode } from "react";
import "@/styles/admin.css";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";

const AdminLayout = ({ children }: { children: ReactNode }) => {
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
