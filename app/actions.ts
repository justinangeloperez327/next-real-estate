"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/redirect";
import { isAdmin } from "@/lib/auth";

async function getOrigin() {
  const h = await headers();
  return (
    h.get("origin") ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  );
}

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function signUpAction(formData: FormData) {
  const email = field(formData, "email");
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    encodedRedirect("error", "/sign-up", "Email and password are required");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${await getOrigin()}/auth/callback` },
  });

  if (error) {
    console.error("signUp failed:", error.code, error.message);
    encodedRedirect("error", "/sign-up", error.message);
  }

  encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link.",
  );
}

export async function signInAction(formData: FormData) {
  const email = field(formData, "email");
  const password = formData.get("password")?.toString() ?? "";

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    encodedRedirect("error", "/sign-in", error.message);
  }

  redirect(isAdmin(data.user) ? "/dashboard" : "/");
}

export async function forgotPasswordAction(formData: FormData) {
  const email = field(formData, "email");
  if (!email) {
    encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${await getOrigin()}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error("resetPasswordForEmail failed:", error.message);
    encodedRedirect("error", "/forgot-password", "Could not reset password");
  }

  encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
}

export async function resetPasswordAction(formData: FormData) {
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password and confirm password are required",
    );
  }
  if (password !== confirmPassword) {
    encodedRedirect("error", "/reset-password", "Passwords do not match");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    encodedRedirect("error", "/reset-password", "Password update failed");
  }

  encodedRedirect("success", "/reset-password", "Password updated");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sign-in");
}
