"use client";

import AuthForm from "@/components/auth-form";
import { signUp } from "@/lib/actions/auth";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{
        fullName: "",
        email: "",
        password: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
};

export default SignUp;
