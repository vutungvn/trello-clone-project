import { type ReactNode, useState } from "react";
import { TriangleAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

interface ConfirmDialogProps {
  /** Nút mở hộp thoại */
  trigger: ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Có thì phải gõ đúng chữ này mới xác nhận được */
  confirmText?: string;
  onConfirm?: () => void;
}

/** Hộp thoại xác nhận cho các hành động không hoàn tác được */
export function ConfirmDialog({
  trigger,
  title,
  description,
  ...footerProps
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-5 p-6 shadow-[0_12px_24px_rgba(9,30,66,0.35)] ring-0 data-[size=default]:max-w-[calc(100%-2rem)] data-[size=default]:sm:max-w-110">
        <div className="flex flex-col items-start gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#FFF0EF] text-danger">
            <TriangleAlert aria-hidden="true" className="size-5" />
          </span>
          <div className="flex flex-col gap-1.5">
            <AlertDialogTitle className="text-lg leading-6 font-bold text-balance text-text-primary">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-pretty text-text-secondary">
              {description}
            </AlertDialogDescription>
          </div>
        </div>
        <ConfirmFooter {...footerProps} />
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** Tách riêng để chữ đã gõ được xóa mỗi lần đóng hộp thoại */
function ConfirmFooter({
  confirmLabel = "Xóa",
  cancelLabel = "Hủy",
  confirmText,
  onConfirm,
}: Omit<ConfirmDialogProps, "trigger" | "title" | "description">) {
  const [typedText, setTypedText] = useState("");
  const isBlocked = confirmText !== undefined && typedText !== confirmText;

  return (
    <>
      {confirmText !== undefined && (
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-text-secondary">
          <span>
            Nhập <span className="text-text-primary">{confirmText}</span> để xác
            nhận
          </span>
          <Input
            placeholder={confirmText}
            value={typedText}
            onChange={(event) => setTypedText(event.target.value)}
            className="font-normal"
          />
        </label>
      )}
      <div className="flex items-center justify-end gap-2 border-t border-border pt-3">
        <AlertDialogCancel variant="ghost">{cancelLabel}</AlertDialogCancel>
        <AlertDialogAction
          variant="destructive"
          disabled={isBlocked}
          onClick={onConfirm}
          className="disabled:bg-neutral-subtle disabled:text-text-secondary disabled:opacity-100"
        >
          {confirmLabel}
        </AlertDialogAction>
      </div>
    </>
  );
}
