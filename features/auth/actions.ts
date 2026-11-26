"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { validateForm, type FormState } from "@/lib/forms";
import { isAdmin } from "@/features/auth/roles";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/features/auth/schema";

const AUTH_UNAVAILABLE = {
  status: "error",
  message: "Account access is currently unavailable.",
} as const;

const SENSITIVE = { sensitive: ["password", "confirmPassword"] };

// Supabase error codes mapped to plain, non-blaming copy with a next step.
const SIGN_UP_ERRORS: Record<string, string> = {
  user_already_exists:
    "There's already an account for this email. Sign in, or reset your password if you've forgotten it.",
  weak_password:
    "Choose a stronger password: at least 8 characters, ideally a short phrase.",
  over_email_send_rate_limit:
    "We've sent several emails in a short time. Wait a few minutes, then try again.",
  default: "We couldn't create your account just now. Try again in a moment.",
};

async function getOrigin() {
  const origin = (await headers()).get("origin");
  if (origin) return origin;
  return process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";
}

export async function signInAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const form = validateForm(signInSchema, formData, SENSITIVE);
  if (!form.ok) return form.state;

  const supabase = await createClient();
  if (!supabase) return AUTH_UNAVAILABLE;

  const { data, error } = await supabase.auth.signInWithPassword(form.data);

  if (error) {
    return {
      status: "error",
      // Same message for unknown email and wrong password.
      message:
        error.code === "email_not_confirmed"
          ? "This email isn't confirmed yet. Open the link we emailed you, then sign in."
          : "That email and password don't match an account. Check them and try again, or reset your password.",
      values: { email: form.data.email },
    };
  }

  redirect(isAdmin(data.user) ? "/dashboard" : "/");
}

export async function signUpAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const form = validateForm(signUpSchema, formData, SENSITIVE);
  if (!form.ok) return form.state;

  const supabase = await createClient();
  if (!supabase) return AUTH_UNAVAILABLE;

  const { error } = await supabase.auth.signUp({
    ...form.data,
    options: { emailRedirectTo: `${await getOrigin()}/auth/callback` },
  });

  if (error) {
    console.error("signUp failed:", error.code, error.message);
    return {
      status: "error",
      message: SIGN_UP_ERRORS[error.code ?? ""] ?? SIGN_UP_ERRORS.default,
      values: { email: form.data.email },
    };
  }

  return {
    status: "success",
    message: "Check your email for a link to confirm your account.",
  };
}

export async function forgotPasswordAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const form = validateForm(forgotPasswordSchema, formData);
  if (!form.ok) return form.state;

  const supabase = await createClient();
  if (!supabase) return AUTH_UNAVAILABLE;

  const { error } = await supabase.auth.resetPasswordForEmail(form.data.email, {
    redirectTo: `${await getOrigin()}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) console.error("resetPasswordForEmail failed:", error.message);

  // Same response whether or not the account exists, so the form can't be
  // used to discover registered emails.
  return {
    status: "success",
    message:
      "If an account exists for that email, we've sent a link to reset your password.",
  };
}

export async function resetPasswordAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const form = validateForm(resetPasswordSchema, formData, SENSITIVE);
  if (!form.ok) return form.state;

  const supabase = await createClient();
  if (!supabase) return AUTH_UNAVAILABLE;

  const { error } = await supabase.auth.updateUser({
    password: form.data.password,
  });

  if (error) {
    return {
      status: "error",
      message:
        error.code === "same_password"
          ? "Choose a password different from your current one."
          : "We couldn't update your password. Request a new reset link and try again.",
    };
  }

  return { status: "success", message: "Your password has been updated." };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/sign-in");
}
