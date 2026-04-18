import { serve } from "@upstash/workflow/nextjs";

type InitialData = {
  email: string;
  fullName: string;
};

type UserState = "non-active" | "active";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Welcome Email
  await context.run("new-signup", async () => {
    await sendEmail(`Welcome ${fullName}!`, email);
  });

  await context.sleep("wait-for-3-days", ONE_DAY_IN_MS);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail(`Hey ${fullName}, we miss you!`, email);
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail(`Welcome back ${fullName}!`, email);
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});

async function sendEmail(message: string, email: string) {
  // Implement email sending logic here
  console.log(`Sending ${message} email to ${email}`);
}

const getUserState = async (email: string): Promise<UserState> => {
  // Implement user state logic here
  return "non-active";
};
