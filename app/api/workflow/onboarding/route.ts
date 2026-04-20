import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type InitialData = {
  email: string;
  fullName: string;
};

type UserState = "non-active" | "active";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (
    timeDifference > THREE_DAYS_IN_MS &&
    timeDifference <= THIRTY_DAYS_IN_MS
  ) {
    return "non-active";
  }

  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Welcome Email
  await context.run("welcome-email", async () => {
    await sendEmail({
      email,
      subject: "Welcome to the platform",
      message: `
        Welcome to BookWise 👋

        Hi {{name}},

        We’re really happy to have you on board 🚀

        Your account has been successfully created and you’re now part of our platform.

        If you have any questions, feel free to reach out anytime.

        Welcome again — we’re excited to have you here!

        — BookWise Team`,
      name: fullName,
    });
  });

  await context.sleep("wait-for-3-days", THREE_DAYS_IN_MS);

  const state = await context.run("check-user-state", async () => {
    return await getUserState(email);
  });

  if (state === "non-active") {
    await context.run("inactive-email", async () => {
      await sendEmail({
        email,
        subject: "Are you still there?",
        message: `
        We miss you 👀

        Hi {{name}},

        It’s been a while since your last activity on BookWise.

        We noticed you haven’t used your account recently, and we just wanted to check in.

        Come back and continue where you left off 🚀

        If something didn’t work for you, let us know — we’d love to improve.

        — BookWise Team
        `,
        name: fullName,
      });
    });
  } else if (state === "active") {
    await context.run("active-email", async () => {
      await sendEmail({
        email,
        subject: "Welcome back!",
        message: `
        Welcome back 🎉

        Hi {{name}},

        Great to see you again!

        We’re glad you’re back on BookWise. Everything is waiting for you where you left off.

        If you need any help getting started again, we’re here for you.

        Let’s continue 🚀

        — BookWise Team
        `,
        name: fullName,
      });
    });
  }

  await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
});
