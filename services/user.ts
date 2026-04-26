import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { User } from "@/types";
import { eq } from "drizzle-orm";

export async function getCurrentUser(userId: string): Promise<User> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user;
}
