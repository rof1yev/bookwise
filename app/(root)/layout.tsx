import { after } from "next/server";
import { ReactNode } from "react";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import Header from "@/components/header";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  after(async () => {
    if (!session?.user?.id) return;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id as string))
      .limit(1);

    if (user[0]?.lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id as string));
  });

  return (
    <main className="root-container">
      <div className="mx-auto w-full max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
