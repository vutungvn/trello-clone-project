import { type ReactNode, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface FormDialogProps {
  /** Nút mở hộp thoại, không cần nếu truyền open và onOpenChange */
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  submitLabel: string;
  className?: string;
  children: ReactNode;
}

/** Hộp thoại có form: tiêu đề, nội dung và hàng nút Hủy / gửi */
export function FormDialog({
  trigger,
  open,
  onOpenChange,
  title,
  description,
  submitLabel,
  className,
  children,
}: FormDialogProps) {
  const [innerOpen, setInnerOpen] = useState(false);
  const setOpen = onOpenChange ?? setInnerOpen;

  return (
    <Dialog open={open ?? innerOpen} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-h-[calc(100vh-2rem)] gap-0 overflow-y-auto border border-border p-0 shadow-[0_12px_24px_rgba(9,30,66,0.35)] ring-0 sm:max-w-120",
          className,
        )}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <header className="relative border-b border-border px-6 pt-5 pb-4">
            <DialogTitle className="pr-8 text-lg leading-6 font-bold text-text-primary">
              {title}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-text-secondary">
              {description}
            </DialogDescription>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Đóng hộp thoại"
                className="absolute top-4 right-4 rounded-full"
              >
                <X aria-hidden="true" />
              </Button>
            </DialogClose>
          </header>

          <div className="flex flex-col gap-4 p-6">{children}</div>

          <footer className="flex items-center justify-end gap-2 border-t border-border bg-surface-column px-6 py-3.5">
            <DialogClose asChild>
              <Button variant="ghost" className="hover:bg-neutral-hover">
                Hủy
              </Button>
            </DialogClose>
            <Button type="submit" className="px-4">
              {submitLabel}
            </Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
}
