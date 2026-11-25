import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LABEL_COLOR_CLASS, LABEL_COLORS } from "@/lib/labels";
import { cn } from "@/lib/utils";
import type { Label, LabelColor } from "@/types/board";

interface LabelFormProps {
  /** Không có là tạo nhãn mới */
  label?: Label;
  onClose: () => void;
}

export function LabelForm({ label, onClose }: LabelFormProps) {
  const [name, setName] = useState(label?.name ?? "");
  const [color, setColor] = useState<LabelColor>(label?.color ?? "green");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="flex flex-col gap-3"
    >
      <div className="rounded-sm bg-surface-column p-4">
        <span
          className={cn(
            "flex h-8 items-center truncate rounded-sm px-3 text-sm font-medium text-text-primary",
            LABEL_COLOR_CLASS[color],
          )}
        >
          {name}
        </span>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-text-secondary">
          Tiêu đề
        </span>
        <Input
          name="name"
          maxLength={50}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-8"
        />
      </label>

      <fieldset className="flex flex-col gap-1.5">
        <legend className="mb-1.5 text-xs font-semibold text-text-secondary">
          Chọn màu
        </legend>
        <div className="grid grid-cols-5 gap-1.5">
          {LABEL_COLORS.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-label={`Màu ${item.name}`}
              aria-pressed={item.value === color}
              onClick={() => setColor(item.value)}
              className={cn(
                "h-8 rounded-sm outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-text-primary aria-pressed:ring-2 aria-pressed:ring-focus-ring aria-pressed:ring-offset-2",
                LABEL_COLOR_CLASS[item.value],
              )}
            />
          ))}
        </div>
      </fieldset>

      <div className="flex items-center gap-2 pt-1">
        <Button type="submit" className="px-4">
          {label ? "Lưu" : "Tạo"}
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Hủy
        </Button>
      </div>
    </form>
  );
}
