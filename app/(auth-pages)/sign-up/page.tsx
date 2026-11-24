import type { Metadata } from "next";
import Link from "next/link";
import { AuthFormHeader } from "@/features/auth/components/auth-form-header";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export const metadata: Metadata = { title: "Sign up" };

export default function SignUpPage() {
  return (
    <>
      <AuthFormHeader title="Create an account">
        Already have an account?{" "}
        <Link className="font-medium underline" href="/sign-in">
          Sign in
        </Link>
      </AuthFormHeader>
      <SignUpForm />
    </>
  );
}
