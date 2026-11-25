import { Check, Clock } from "lucide-react";
import { type DueStatus, formatShortDate, getDueStatus } from "@/lib/date";
import { cn } from "@/lib/utils";

const STATUS_CLASS: Record<DueStatus, string> = {
  completed: "rounded-sm bg-success px-1.5 py-0.5 font-semibold text-on-success",
  overdue: "rounded-sm bg-danger px-1.5 py-0.5 font-semibold text-on-danger",
  soon: "rounded-sm bg-warning px-1.5 py-0.5 font-semibold text-on-warning",
  normal: "",
};

const STATUS_LABEL: Record<DueStatus, string> = {
  completed: "Đã hoàn thành",
  overdue: "Đã quá hạn",
  soon: "Sắp hết hạn",
  normal: "Ngày hết hạn",
};

interface DueDateBadgeProps {
  dueDate: string;
  isCompleted: boolean;
  now: Date;
}

export function DueDateBadge({ dueDate, isCompleted, now }: DueDateBadgeProps) {
  const status = getDueStatus(dueDate, isCompleted, now);
  const Icon = status === "completed" ? Check : Clock;

  return (
    <span
      title={STATUS_LABEL[status]}
      className={cn(
        "inline-flex items-center gap-1 text-xs tabular-nums",
        STATUS_CLASS[status],
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {formatShortDate(dueDate)}
    </span>
  );
}
