import type { ReactNode } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { LabelChip } from "@/components/common/LabelChip";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { type DueStatus, formatShortDateTime, getDueStatus } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { Label } from "@/types/board";
import type { Card } from "@/types/card";
import type { User } from "@/types/user";
import { DueDatePopover } from "./DueDatePopover";
import { LabelsPopover } from "./LabelsPopover";
import { MembersPopover } from "./MembersPopover";

const DUE_TAG: Record<DueStatus, { text: string; className: string } | null> = {
  completed: { text: "Hoàn thành", className: "bg-success text-on-success" },
  overdue: { text: "Quá hạn", className: "bg-danger text-on-danger" },
  soon: { text: "Sắp hết hạn", className: "bg-warning text-on-warning" },
  normal: null,
};

interface CardMetaProps {
  card: Card;
  members: User[];
  boardLabels: Label[];
  isCompleted: boolean;
  onCompletedChange: (isCompleted: boolean) => void;
  now: Date;
}

/** Người phụ trách, nhãn và ngày hết hạn; mục nào trống thì ẩn */
export function CardMeta({
  card,
  members,
  boardLabels,
  isCompleted,
  onCompletedChange,
  now,
}: CardMetaProps) {
  const dueTag =
    card.dueDate !== null
      ? DUE_TAG[getDueStatus(card.dueDate, isCompleted, now)]
      : null;

  if (
    card.assignees.length === 0 &&
    card.labels.length === 0 &&
    card.dueDate === null
  ) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-start gap-6 pl-9">
      {card.assignees.length > 0 && (
        <MetaBlock title="Người phụ trách">
          {card.assignees.map((user) => (
            <UserAvatar key={user.id} user={user} />
          ))}
          <MembersPopover
            members={members}
            assignees={card.assignees}
            trigger={
              <Button
                variant="secondary"
                size="icon"
                aria-label="Thêm người phụ trách"
                className="rounded-full"
              >
                <Plus aria-hidden="true" />
              </Button>
            }
          />
        </MetaBlock>
      )}

      {card.labels.length > 0 && (
        <MetaBlock title="Nhãn">
          {card.labels.map((label) => (
            <LabelChip
              key={label.id}
              label={label}
              className="h-8 px-3 text-sm font-medium"
            />
          ))}
          <LabelsPopover
            boardLabels={boardLabels}
            cardLabels={card.labels}
            trigger={
              <Button variant="secondary" size="icon" aria-label="Thêm nhãn">
                <Plus aria-hidden="true" />
              </Button>
            }
          />
        </MetaBlock>
      )}

      {card.dueDate !== null && (
        <MetaBlock title="Ngày hết hạn">
          <div className="flex h-8 items-center rounded-sm bg-black/6 pl-2.5">
            <Checkbox
              aria-label="Đánh dấu hoàn thành"
              checked={isCompleted}
              onCheckedChange={(checked) => onCompletedChange(checked === true)}
            />
            <DueDatePopover
              dueDate={card.dueDate}
              now={now}
              trigger={
                <Button
                  variant="ghost"
                  className="gap-2 px-2 text-text-primary hover:bg-neutral-hover"
                >
                  <span className="tabular-nums">
                    {formatShortDateTime(card.dueDate)}
                  </span>
                  {dueTag && (
                    <span
                      className={cn(
                        "rounded-sm px-1.5 py-0.5 text-xs font-semibold",
                        dueTag.className,
                      )}
                    >
                      {dueTag.text}
                    </span>
                  )}
                  <ChevronDown
                    aria-hidden="true"
                    className="text-text-secondary"
                  />
                </Button>
              }
            />
          </div>
        </MetaBlock>
      )}
    </div>
  );
}

function MetaBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-text-secondary">{title}</span>
      <div className="flex flex-wrap items-center gap-1">{children}</div>
    </div>
  );
}
