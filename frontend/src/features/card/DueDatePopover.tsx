import { type ReactNode, useState } from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { vi } from "react-day-picker/locale";
import { PopoverPanel } from "@/components/common/PopoverPanel";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { formatDate, formatTime } from "@/lib/date";

const WEEKDAY_NAMES = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const DEFAULT_TIME = "17:00";

interface DueDatePopoverProps {
  /** Nút mở popover */
  trigger: ReactNode;
  dueDate: string | null;
  now: Date;
}

export function DueDatePopover({ trigger, dueDate, now }: DueDatePopoverProps) {
  return (
    <Popover modal>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverPanel title="Ngày hết hạn" className="w-80">
        <DueDateForm dueDate={dueDate} now={now} />
      </PopoverPanel>
    </Popover>
  );
}

/** Tách riêng để lựa chọn được đặt lại mỗi lần mở popover */
function DueDateForm({
  dueDate,
  now,
}: Pick<DueDatePopoverProps, "dueDate" | "now">) {
  const [selected, setSelected] = useState(
    dueDate ? new Date(dueDate) : undefined,
  );

  return (
    <>
      <Calendar
        mode="single"
        locale={vi}
        today={now}
        defaultMonth={selected ?? now}
        selected={selected}
        onSelect={setSelected}
        formatters={{
          formatCaption: (month) =>
            `Tháng ${month.getMonth() + 1}, ${month.getFullYear()}`,
          formatWeekdayName: (day) => WEEKDAY_NAMES[day.getDay()],
        }}
        className="p-0"
        classNames={{
          root: "w-full",
          month: "flex w-full flex-col gap-2",
          caption_label: "text-sm font-semibold text-text-primary select-none",
          weekday:
            "flex-1 py-1 text-xs font-semibold text-text-secondary select-none",
          week: "mt-0.5 flex w-full",
          day: "group/day flex-1 p-0 text-center tabular-nums select-none [&>button]:aspect-auto [&>button]:h-8 [&>button]:rounded-sm [&>button]:text-text-primary [&>button[data-selected-single=true]]:font-semibold [&>button[data-selected-single=true]]:text-on-primary",
          today:
            "[&>button]:font-semibold [&>button:not([data-selected-single=true])]:border-2 [&>button:not([data-selected-single=true])]:border-primary [&>button:not([data-selected-single=true])]:text-primary",
          outside:
            "[&>button:not([data-selected-single=true])]:text-text-disabled",
        }}
      />

      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-text-secondary">Ngày</span>
          <Input
            readOnly
            value={selected ? formatDate(selected) : ""}
            placeholder="Chọn trên lịch"
            className="h-8 tabular-nums"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-text-secondary">Giờ</span>
          <Input
            defaultValue={dueDate ? formatTime(dueDate) : DEFAULT_TIME}
            className="h-8 tabular-nums"
          />
        </label>
      </div>

      <div className="flex flex-col gap-1.5 pt-1">
        <PopoverPrimitive.Close asChild>
          <Button className="w-full">Lưu</Button>
        </PopoverPrimitive.Close>
        <PopoverPrimitive.Close asChild>
          <Button variant="secondary" className="w-full">
            Gỡ bỏ
          </Button>
        </PopoverPrimitive.Close>
      </div>
    </>
  );
}
