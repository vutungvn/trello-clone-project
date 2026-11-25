import { differenceInCalendarDays, format } from "date-fns";

export type DueStatus = "completed" | "overdue" | "soon" | "normal";

const DUE_SOON_DAYS = 3;

/** "28 thg 11" */
export function formatShortDate(iso: string): string {
  return format(new Date(iso), "d 'thg' M");
}

/** "30 thg 11, 17:00" */
export function formatShortDateTime(iso: string): string {
  return format(new Date(iso), "d 'thg' M, HH:mm");
}

/** "12/01/2026" */
export function formatDate(iso: string): string {
  return format(new Date(iso), "dd/MM/yyyy");
}

export function getDueStatus(
  dueDate: string,
  isCompleted: boolean,
  now: Date,
): DueStatus {
  if (isCompleted) return "completed";
  const due = new Date(dueDate);
  if (due < now) return "overdue";
  return differenceInCalendarDays(due, now) <= DUE_SOON_DAYS
    ? "soon"
    : "normal";
}
