import type { Metadata } from "next";
import Link from "next/link";
import { AuthFormHeader } from "@/features/auth/components/auth-form-header";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthFormHeader title="Reset your password">
        Remembered it?{" "}
        <Link className="font-medium underline" href="/sign-in">
          Sign in
        </Link>
      </AuthFormHeader>
      <ForgotPasswordForm />
    </>
  );
}
