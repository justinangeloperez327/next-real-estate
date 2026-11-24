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

const SENSITIVE = { sensitive: ["password", "confirmPassword"] };

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
  const { data, error } = await supabase.auth.signInWithPassword(form.data);

  if (error) {
    return {
      status: "error",
      // Same message for unknown email and wrong password.
      message: "Email or password is incorrect.",
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
  const { error } = await supabase.auth.signUp({
    ...form.data,
    options: { emailRedirectTo: `${await getOrigin()}/auth/callback` },
  });

  if (error) {
    console.error("signUp failed:", error.code, error.message);
    return {
      status: "error",
      message: error.message,
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
  const { error } = await supabase.auth.updateUser({
    password: form.data.password,
  });

  if (error) {
    return {
      status: "error",
      message:
        error.code === "same_password"
          ? "Choose a password different from your current one."
          : "Couldn't update your password. Request a new reset link and try again.",
    };
  }

  return { status: "success", message: "Your password has been updated." };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sign-in");
}
