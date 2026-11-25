import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddCardFormProps {
  onClose: () => void;
}

export function AddCardForm({ onClose }: AddCardFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
      className="flex shrink-0 flex-col gap-2 pt-1"
    >
      <textarea
        autoFocus
        required
        rows={3}
        name="title"
        maxLength={255}
        aria-label="Tiêu đề thẻ"
        placeholder="Nhập tiêu đề cho thẻ này…"
        onKeyDown={(event) => {
          // Enter để thêm, Shift + Enter để xuống dòng
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        className="w-full resize-none rounded-lg bg-surface px-3 py-2 text-sm text-text-primary shadow-[0_1px_1px_#091E4240] outline-none placeholder:text-text-disabled focus:ring-2 focus:ring-focus-ring"
      />
      <div className="flex items-center gap-1.5">
        <Button type="submit">Thêm thẻ</Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Hủy thêm thẻ"
          onClick={onClose}
          className="hover:bg-neutral-hover"
        >
          <X aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
