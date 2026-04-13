import z from "zod";

export const SignUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8).max(32),
  universityId: z.coerce.number(),
  universityCard: z.string().url("University Card is required"),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});
