import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthFormHeader } from "@/features/auth/components/auth-form-header";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <>
      <AuthFormHeader title="Sign in">
        Don&apos;t have an account?{" "}
        <Link className="font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </AuthFormHeader>
      {/* The form reads ?error= from the URL, which is request-time data. */}
      <Suspense>
        <SignInForm />
      </Suspense>
    </>
  );
}
