import type { ReactNode } from "react";
import { Archive, Clock, Tag, Trash2, User as UserIcon } from "lucide-react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import type { Label } from "@/types/board";
import type { Card } from "@/types/card";
import type { User } from "@/types/user";
import { DueDatePopover } from "./DueDatePopover";
import { LabelsPopover } from "./LabelsPopover";
import { MembersPopover } from "./MembersPopover";

const ACTION_CLASS = "w-full justify-start gap-2";
const ICON_CLASS = "text-text-secondary";

interface CardActionsProps {
  card: Card;
  members: User[];
  boardLabels: Label[];
  now: Date;
  onClose: () => void;
}

export function CardActions({
  card,
  members,
  boardLabels,
  now,
  onClose,
}: CardActionsProps) {
  return (
    <aside
      aria-label="Thao tác thẻ"
      className="flex w-full shrink-0 flex-col gap-5 md:w-44"
    >
      <ActionGroup title="Thêm vào thẻ">
        <MembersPopover
          members={members}
          assignees={card.assignees}
          trigger={
            <Button variant="secondary" className={ACTION_CLASS}>
              <UserIcon aria-hidden="true" className={ICON_CLASS} />
              Thành viên
            </Button>
          }
        />
        <LabelsPopover
          boardLabels={boardLabels}
          cardLabels={card.labels}
          trigger={
            <Button variant="secondary" className={ACTION_CLASS}>
              <Tag aria-hidden="true" className={ICON_CLASS} />
              Nhãn
            </Button>
          }
        />
        <DueDatePopover
          dueDate={card.dueDate}
          now={now}
          trigger={
            <Button variant="secondary" className={ACTION_CLASS}>
              <Clock aria-hidden="true" className={ICON_CLASS} />
              Ngày hết hạn
            </Button>
          }
        />
      </ActionGroup>

      <ActionGroup title="Thao tác">
        <Button variant="secondary" className={ACTION_CLASS} onClick={onClose}>
          <Archive aria-hidden="true" className={ICON_CLASS} />
          Lưu trữ
        </Button>
        <ConfirmDialog
          title="Xóa thẻ này?"
          description="Thẻ và toàn bộ bình luận sẽ bị xóa vĩnh viễn."
          onConfirm={onClose}
          trigger={
            <Button variant="destructive" className={ACTION_CLASS}>
              <Trash2 aria-hidden="true" />
              Xóa thẻ
            </Button>
          }
        />
      </ActionGroup>
    </aside>
  );
}

function ActionGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold text-text-secondary">{title}</span>
      {children}
    </div>
  );
}
