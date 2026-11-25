const AVATAR_COLOR_CLASSES = [
  "bg-primary text-on-primary",
  "bg-label-purple text-text-primary",
  "bg-label-sky text-text-primary",
  "bg-success text-on-success",
  "bg-warning text-on-warning",
  "bg-label-pink text-text-primary",
];

/** "Nguyễn Văn An" → "NA" */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

export function getAvatarColorClass(userId: number): string {
  return AVATAR_COLOR_CLASSES[(userId - 1) % AVATAR_COLOR_CLASSES.length];
}
