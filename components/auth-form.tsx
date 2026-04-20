"use client";

import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/lib/constants";
import ImageUpload from "./image-upload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";

interface AuthFormProps<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  schema: z.ZodTypeAny;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();
  const { update } = useSession();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onSubmit",
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    setIsSubmitting(true);

    try {
      const result = await onSubmit(data);
      if (result.success) {
        toast.success("Successfully", {
          description: isSignIn
            ? "You have successfully singed in."
            : "You have successfully signed up.",
        });

        await update();
        router.push("/");
      } else
        toast.error("Something went wrong", {
          description: result.error || "An error occurred.",
        });
    } catch (error) {
      console.error("AUTH FORM ERROR: ", error);
      toast.error("Something went wrong", {
        description: "An error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full"
      >
        <FieldGroup>
          {Object.keys(defaultValues).map((field) => (
            <Controller
              key={field}
              name={field as Path<T>}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="capitalize"
                    htmlFor="form-rhf-demo-title"
                  >
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FieldLabel>
                  {field.name === "universityCard" ? (
                    <ImageUpload onChange={field.onChange} />
                  ) : (
                    <div className="relative">
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        required
                        min={field.name === "universityId" ? 0 : undefined}
                        type={
                          field.name === "password"
                            ? !isHidden
                              ? "text"
                              : "password"
                            : FIELD_TYPES[
                                field.name as keyof typeof FIELD_TYPES
                              ]
                        }
                        className="form-input bg-[#232839]"
                      />
                      {field.name === "password" && (
                        <button
                          type="button"
                          onClick={() => setIsHidden((prev) => !prev)}
                          className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
                        >
                          {isHidden ? (
                            <EyeIcon size={18} />
                          ) : (
                            <EyeOffIcon size={18} />
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </Field>
              )}
            />
          ))}
        </FieldGroup>
      </form>
      <div className="flex flex-col gap-5 mt-4">
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="form-rhf-demo"
            className="form-btn text-dark-300 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2Icon className="animate-spin" />}
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </Field>
        <p className="text-center text-base font-medium">
          {isSignIn ? "New to BookWise?" : "Already have an account?"}
          &nbsp;
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-primary"
          >
            {isSignIn ? "Create an account" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
