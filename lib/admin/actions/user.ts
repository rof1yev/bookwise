"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { ROLES, STATUS } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function changeUserRole({
  userId,
  role,
}: {
  userId: string;
  role: ROLES;
}): Promise<{ success: boolean; message: string }> {
  try {
    await db.update(users).set({ role }).where(eq(users.id, userId));

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User role successfully changed!",
    };
  } catch (error) {
    console.error("Failed change user role action", error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
}

export async function deleteUserById(
  userId: string,
): Promise<{ success: boolean; message: string }> {
  try {
    await db.delete(users).where(eq(users.id, userId));

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User successfully deleted!",
    };
  } catch (error) {
    console.error("Failed delete user action", error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
}

export async function changeUserStatus({
  status,
  userId,
}: {
  status: STATUS;
  userId: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    await db.update(users).set({ status }).where(eq(users.id, userId));

    revalidatePath("/admin/account-requests");

    return {
      success: true,
      message: "User status successfully changed!",
    };
  } catch (error) {
    console.error("Failed change user status ", error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
}
