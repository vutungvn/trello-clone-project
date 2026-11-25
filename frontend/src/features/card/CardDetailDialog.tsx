import { useState } from "react";
import { CreditCard, X } from "lucide-react";
import { EditableText } from "@/components/common/EditableText";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Label } from "@/types/board";
import type { Card, Comment } from "@/types/card";
import type { User } from "@/types/user";
import { CardActions } from "./CardActions";
import { CardComments } from "./CardComments";
import { CardDescription } from "./CardDescription";
import { CardMeta } from "./CardMeta";

interface CardDetailDialogProps {
  card: Card;
  listTitle: string;
  members: User[];
  boardLabels: Label[];
  /** Mới nhất đứng trước */
  comments: Comment[];
  currentUser: User;
  now: Date;
  onClose: () => void;
}

export function CardDetailDialog({
  card,
  listTitle,
  members,
  boardLabels,
  comments,
  currentUser,
  now,
  onClose,
}: CardDetailDialogProps) {
  const [isCompleted, setIsCompleted] = useState(card.isCompleted);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        // Esc khi đang sửa tại chỗ chỉ đóng ô sửa, không đóng cả modal
        onEscapeKeyDown={(event) => {
          if (
            event.target instanceof Element &&
            event.target.closest("[data-inline-edit]")
          ) {
            event.preventDefault();
          }
        }}
        className="top-12 flex max-h-[calc(100vh-6rem)] translate-y-0 flex-col gap-0 overflow-hidden bg-surface-column p-0 text-text-primary shadow-[0_12px_24px_rgba(9,30,66,0.35)] ring-0 sm:max-w-3xl"
      >
        <div className="overflow-y-auto p-6">
          <div className="mb-5 flex items-start gap-3 pr-10">
            <CreditCard
              aria-hidden="true"
              className="mt-0.5 size-6 shrink-0 text-text-secondary"
            />
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-xl leading-6 font-semibold text-text-primary">
                <EditableText
                  value={card.title}
                  label="Tiêu đề thẻ"
                  className="-ml-1.5 px-1.5 py-0.5"
                />
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-text-secondary">
                trong danh sách <span className="font-medium">{listTitle}</span>
              </DialogDescription>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 md:flex-row">
            <div className="flex w-full min-w-0 flex-1 flex-col gap-6">
              <CardMeta
                card={card}
                members={members}
                boardLabels={boardLabels}
                isCompleted={isCompleted}
                onCompletedChange={setIsCompleted}
                now={now}
              />

              <label className="ml-9 inline-flex cursor-pointer items-center gap-2 self-start text-sm font-medium">
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={(checked) =>
                    setIsCompleted(checked === true)
                  }
                />
                Đánh dấu hoàn thành
              </label>

              <CardDescription description={card.description} />
              <CardComments
                comments={comments}
                currentUser={currentUser}
                now={now}
              />
            </div>

            <CardActions
              card={card}
              members={members}
              boardLabels={boardLabels}
              now={now}
              onClose={onClose}
            />
          </div>
        </div>

        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Đóng chi tiết thẻ"
            className="absolute top-3 right-3 rounded-full hover:bg-neutral-hover"
          >
            <X aria-hidden="true" className="size-5" />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
