import type { ReactNode } from "react";
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

interface ConfirmDialogProps {
  /** Nút mở hộp thoại */
  trigger: ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm?: () => void;
}

/** Hộp thoại xác nhận cho các hành động xóa */
export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = "Xóa",
  onConfirm,
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

        <div className="flex items-center justify-end gap-2 border-t border-border pt-3">
          <AlertDialogCancel variant="ghost">Hủy</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
