import { LABEL_COLOR_CLASS } from "@/lib/labels";
import { cn } from "@/lib/utils";
import type { Label } from "@/types/board";

interface LabelChipProps {
  label: Label;
  className?: string;
}

export function LabelChip({ label, className }: LabelChipProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 min-w-10 items-center rounded-sm px-2 text-xs font-semibold text-text-primary",
        LABEL_COLOR_CLASS[label.color],
        className,
      )}
    >
      {label.name}
    </span>
  );
}
