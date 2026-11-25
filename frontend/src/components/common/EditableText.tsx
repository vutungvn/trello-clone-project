import { useState } from "react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  value: string;
  /** Tên của ô nhập cho trình đọc màn hình */
  label: string;
  className?: string;
}

/**
 * Bấm vào chữ để sửa tại chỗ, Enter, Esc hoặc rời ô nhập thì đóng.
 * Hiện chưa lưu giá trị mới.
 */
export function EditableText({ value, label, className }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <input
        autoFocus
        data-inline-edit
        aria-label={label}
        defaultValue={value}
        onFocus={(event) => event.target.select()}
        onBlur={() => setIsEditing(false)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === "Escape") {
            setIsEditing(false);
          }
        }}
        className={cn(
          "w-full min-w-0 rounded-sm bg-surface text-text-primary ring-2 ring-focus-ring outline-none",
          className,
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className={cn(
        "max-w-full cursor-text rounded-sm text-left outline-none hover:bg-neutral-hover focus-visible:ring-2 focus-visible:ring-focus-ring",
        className,
      )}
    >
      {value}
    </button>
  );
}
