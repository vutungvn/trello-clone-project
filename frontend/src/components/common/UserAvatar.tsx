import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarColorClass, getInitials } from "@/lib/avatar";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

const SIZE_CLASS = {
  sm: "size-6 text-xs",
  md: "size-7 text-xs",
  lg: "size-8 text-xs",
  xl: "size-10 text-sm",
  "2xl": "size-24 text-3xl",
};

interface UserAvatarProps {
  user: User;
  size?: keyof typeof SIZE_CLASS;
  className?: string;
}

export function UserAvatar({ user, size = "lg", className }: UserAvatarProps) {
  return (
    <Avatar
      title={user.name}
      className={cn(SIZE_CLASS[size], "after:hidden", className)}
    >
      {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
      <AvatarFallback
        role="img"
        aria-label={user.name}
        className={cn(
          "font-semibold text-[length:inherit]",
          getAvatarColorClass(user.id),
        )}
      >
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
}
