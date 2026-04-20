import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl!,
  token: config.env.upstash.qstashToken!,
});

export const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
  name,
  time = new Date().toISOString(),
}: {
  email: string;
  subject: string;
  message: string;
  name?: string;
  time?: string;
}) => {
  await qstashClient.publishJSON({
    url: `${config.env.prodApiEndpoint}/api/send-email`,
    body: {
      email,
      subject,
      message,
      name,
      time,
    },
  });
};
