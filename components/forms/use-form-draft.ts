"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Draft = Record<string, string | boolean>;

function read(key: string): Draft | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

function write(key: string, draft: Draft | null) {
  try {
    if (draft) window.localStorage.setItem(key, JSON.stringify(draft));
    else window.localStorage.removeItem(key);
  } catch {
    // Storage can be unavailable (private mode, blocked); drafts are a nicety.
  }
}

/**
 * Saves a long form's text fields to localStorage as the person types, and
 * restores them on return. Never stores fields named in `exclude` (or any
 * password field). Call `clear()` after a successful submit.
 *
 * Spread `formProps` onto the <form>.
 */
export function useFormDraft(
  key: string,
  {
    exclude = [],
    enabled = true,
  }: { exclude?: string[]; enabled?: boolean } = {},
) {
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [restored, setRestored] = useState(false);

  const fields = useCallback(
    () =>
      [...(formRef.current?.elements ?? [])].filter(
        (el): el is HTMLInputElement | HTMLTextAreaElement =>
          (el instanceof HTMLInputElement ||
            el instanceof HTMLTextAreaElement) &&
          !!el.name &&
          el.type !== "password" &&
          el.type !== "hidden" &&
          el.tabIndex !== -1 &&
          !exclude.includes(el.name),
      ),
    [exclude],
  );

  // Restore once after hydration (localStorage only exists in the browser).
  useEffect(() => {
    if (!enabled) return;
    const draft = read(key);
    if (!draft) return;
    let applied = false;
    for (const el of fields()) {
      const value = draft[el.name];
      if (value === undefined) continue;
      if (el instanceof HTMLInputElement && el.type === "checkbox") {
        el.checked = value === true;
      } else {
        el.value = String(value);
      }
      applied = true;
    }
    // Syncing from an external store after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (applied) setRestored(true);
  }, [key, enabled, fields]);

  const save = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const draft: Draft = {};
      for (const el of fields()) {
        draft[el.name] =
          el instanceof HTMLInputElement && el.type === "checkbox"
            ? el.checked
            : el.value;
      }
      const empty = Object.values(draft).every((v) => v === "" || v === false);
      write(key, empty ? null : draft);
    }, 400);
  };

  const clear = useCallback(() => {
    window.clearTimeout(timer.current);
    write(key, null);
  }, [key]);

  const discard = () => {
    clear();
    formRef.current?.reset();
    setRestored(false);
  };

  return {
    formProps: enabled ? { ref: formRef, onInput: save } : { ref: formRef },
    restored,
    discard,
    clear,
  };
}
