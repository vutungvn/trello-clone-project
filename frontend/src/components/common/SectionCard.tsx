import { type ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  description?: string;
  titleSize?: "sm" | "lg";
  tone?: "default" | "danger";
  children: ReactNode;
}

/** Khối nội dung có viền ở trang cài đặt và hồ sơ */
export function SectionCard({
  title,
  description,
  titleSize = "lg",
  tone = "default",
  children,
}: SectionCardProps) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "flex flex-col gap-5 rounded-lg border bg-surface p-6 shadow-[0_1px_1px_rgba(9,30,66,0.08)]",
        tone === "danger" ? "border-danger" : "border-border",
      )}
    >
      <div className="flex flex-col gap-1">
        <h2
          id={titleId}
          className={cn(
            titleSize === "lg"
              ? "text-lg leading-6 font-bold"
              : "text-sm font-semibold",
            tone === "danger" ? "text-danger" : "text-text-primary",
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="text-sm text-pretty text-text-secondary">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
