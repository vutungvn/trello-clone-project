import type { User } from "@/types/user";
import { UserAvatar } from "./UserAvatar";

interface AvatarStackProps {
  users: User[];
  max?: number;
}

export function AvatarStack({ users, max = 5 }: AvatarStackProps) {
  const visibleUsers = users.slice(0, max);
  const hiddenCount = users.length - visibleUsers.length;

  return (
    <div className="flex items-center gap-0.5">
      {visibleUsers.map((user) => (
        <UserAvatar
          key={user.id}
          user={user}
          size="md"
          className="ring-2 ring-surface"
        />
      ))}
      {hiddenCount > 0 && (
        <span
          role="img"
          aria-label={`${hiddenCount} thành viên khác`}
          className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-subtle text-xs font-semibold text-text-primary ring-2 ring-surface"
        >
          +{hiddenCount}
        </span>
      )}
    </div>
  );
}
