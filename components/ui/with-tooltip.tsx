"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Wraps an icon-only button with a real tooltip (hover and keyboard focus).
 * The label should be verb-first and match the button's aria-label.
 */
export function WithTooltip({
  label,
  side,
  children,
}: {
  label: string;
  side?: React.ComponentProps<typeof TooltipContent>["side"];
  children: React.ReactElement;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{label}</TooltipContent>
    </Tooltip>
  );
}
