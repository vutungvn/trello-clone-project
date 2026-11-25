import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InvitationMessageProps {
  icon: LucideIcon;
  /** Màu nền và màu icon */
  iconClassName: string;
  title: string;
  description: ReactNode;
  /** Các nút bên dưới */
  children: ReactNode;
}

/** Thông báo khi lời mời không dùng được */
export function InvitationMessage({
  icon: Icon,
  iconClassName,
  title,
  description,
  children,
}: InvitationMessageProps) {
  return (
    <>
      <span
        className={cn(
          "inline-flex size-14 shrink-0 items-center justify-center rounded-full",
          iconClassName,
        )}
      >
        <Icon aria-hidden="true" className="size-7" />
      </span>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl leading-6 font-bold text-balance text-text-primary">
          {title}
        </h1>
        <p className="text-sm text-pretty text-text-secondary">{description}</p>
      </div>
      <div className="flex w-full flex-col gap-2 pt-1">{children}</div>
    </>
  );
}
