import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";

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
export function formatDate(date: Date | string): string {
  return format(new Date(date), "dd/MM/yyyy");
}

/** "17:00" */
export function formatTime(date: Date | string): string {
  return format(new Date(date), "HH:mm");
}

/** "5 phút trước", "2 giờ trước", "Hôm qua lúc 16:20", "20 thg 11, 16:20" */
export function formatRelativeTime(iso: string, now: Date): string {
  const date = new Date(iso);
  const days = differenceInCalendarDays(now, date);
  if (days === 1) return `Hôm qua lúc ${formatTime(date)}`;
  if (days > 1) return formatShortDateTime(iso);

  const hours = differenceInHours(now, date);
  if (hours >= 1) return `${hours} giờ trước`;
  const minutes = differenceInMinutes(now, date);
  return minutes >= 1 ? `${minutes} phút trước` : "Vừa xong";
}

/** "Còn 5 ngày", "Hết hạn hôm nay", "Đã hết hạn" */
export function getInvitationExpiry(
  expiresAt: string,
  now: Date,
): { text: string; isUrgent: boolean } {
  const expiry = new Date(expiresAt);
  if (expiry < now) return { text: "Đã hết hạn", isUrgent: true };
  const days = differenceInCalendarDays(expiry, now);
  return days === 0
    ? { text: "Hết hạn hôm nay", isUrgent: true }
    : { text: `Còn ${days} ngày`, isUrgent: false };
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
