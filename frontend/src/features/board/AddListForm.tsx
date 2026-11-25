import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddListFormProps {
  defaultOpen?: boolean;
}

export function AddListForm({ defaultOpen = false }: AddListFormProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-68 shrink-0 items-center gap-1.5 rounded-xl bg-white/25 p-3 text-sm font-semibold text-on-primary transition-colors duration-100 outline-none hover:bg-white/35 focus-visible:ring-2 focus-visible:ring-white"
      >
        <Plus aria-hidden="true" className="size-4" />
        Thêm danh sách
      </button>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
      className="flex w-68 shrink-0 flex-col gap-2 rounded-xl bg-surface p-2 shadow-[0_1px_1px_#091E4240]"
    >
      <Input
        autoFocus
        name="title"
        aria-label="Tên danh sách"
        placeholder="Nhập tên danh sách…"
        className="px-3"
      />
      <div className="flex items-center gap-1">
        <Button type="submit">Thêm danh sách</Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Hủy"
          onClick={() => setIsOpen(false)}
        >
          <X aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
