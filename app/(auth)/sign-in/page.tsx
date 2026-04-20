"use client";

import AuthForm from "@/components/auth-form";
import { signInWithCredentials } from "@/lib/actions/auth";
import { SignInSchema } from "@/lib/validations";

const SignInPage = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default SignInPage;
