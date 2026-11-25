import { type ReactNode, useState } from "react";
import { Pencil } from "lucide-react";
import { LabelChip } from "@/components/common/LabelChip";
import { PopoverPanel } from "@/components/common/PopoverPanel";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { getLabelColorName } from "@/lib/labels";
import type { Label } from "@/types/board";
import { LabelForm } from "./LabelForm";

type View = { name: "list" } | { name: "create" } | { name: "edit"; label: Label };

const LIST_VIEW: View = { name: "list" };

const VIEW_TITLE: Record<View["name"], string> = {
  list: "Nhãn",
  create: "Tạo nhãn",
  edit: "Chỉnh sửa nhãn",
};

interface LabelsPopoverProps {
  /** Nút mở popover */
  trigger: ReactNode;
  boardLabels: Label[];
  cardLabels: Label[];
}

export function LabelsPopover({
  trigger,
  boardLabels,
  cardLabels,
}: LabelsPopoverProps) {
  const [view, setView] = useState<View>(LIST_VIEW);
  const backToList = () => setView(LIST_VIEW);

  return (
    <Popover modal onOpenChange={backToList}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverPanel
        title={VIEW_TITLE[view.name]}
        onBack={view.name === "list" ? undefined : backToList}
      >
        {view.name === "list" ? (
          <LabelPicker
            boardLabels={boardLabels}
            cardLabels={cardLabels}
            onCreate={() => setView({ name: "create" })}
            onEdit={(label) => setView({ name: "edit", label })}
          />
        ) : (
          <LabelForm
            label={view.name === "edit" ? view.label : undefined}
            onClose={backToList}
          />
        )}
      </PopoverPanel>
    </Popover>
  );
}

interface LabelPickerProps {
  boardLabels: Label[];
  cardLabels: Label[];
  onCreate: () => void;
  onEdit: (label: Label) => void;
}

function LabelPicker({
  boardLabels,
  cardLabels,
  onCreate,
  onEdit,
}: LabelPickerProps) {
  const [keyword, setKeyword] = useState("");

  const visibleLabels = boardLabels.filter((label) =>
    (label.name ?? "").toLowerCase().includes(keyword.trim().toLowerCase()),
  );

  return (
    <>
      <Input
        type="search"
        aria-label="Tìm nhãn"
        placeholder="Tìm nhãn…"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        className="h-8 shrink-0"
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-text-secondary">Nhãn</span>
        {visibleLabels.length === 0 && (
          <p className="py-1.5 text-xs text-text-secondary">
            Không tìm thấy nhãn
          </p>
        )}
        <ul className="flex flex-col gap-1.5">
          {visibleLabels.map((label) => {
            const name = label.name ?? `màu ${getLabelColorName(label.color)}`;
            const checkboxId = `label-${label.id}`;
            return (
              <li key={label.id} className="flex items-center gap-2">
                <Checkbox
                  id={checkboxId}
                  aria-label={`Chọn nhãn ${name}`}
                  defaultChecked={cardLabels.some(
                    (cardLabel) => cardLabel.id === label.id,
                  )}
                />
                <label
                  htmlFor={checkboxId}
                  className="flex min-w-0 flex-1 cursor-pointer"
                >
                  <LabelChip
                    label={label}
                    className="h-8 flex-1 px-3 text-sm font-medium"
                  />
                </label>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Chỉnh sửa nhãn ${name}`}
                  onClick={() => onEdit(label)}
                >
                  <Pencil aria-hidden="true" className="size-3.5" />
                </Button>
              </li>
            );
          })}
        </ul>
      </div>

      <Button variant="secondary" className="w-full" onClick={onCreate}>
        Tạo nhãn mới
      </Button>
    </>
  );
}
