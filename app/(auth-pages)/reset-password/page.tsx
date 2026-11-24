import type { Metadata } from "next";
import { AuthFormHeader } from "@/features/auth/components/auth-form-header";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata: Metadata = {
  title: "Choose a new password",
  robots: { index: false },
};

export default function ResetPasswordPage() {
  return (
    <>
      <AuthFormHeader title="Choose a new password" />
      <ResetPasswordForm />
    </>
  );
}
