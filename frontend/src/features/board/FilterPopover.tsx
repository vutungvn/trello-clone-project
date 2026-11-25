import type { ReactNode } from "react";
import { Tag, User as UserIcon } from "lucide-react";
import { FormField } from "@/components/common/FormField";
import { LabelChip } from "@/components/common/LabelChip";
import { PopoverPanel } from "@/components/common/PopoverPanel";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { type CardFilter, EMPTY_CARD_FILTER } from "@/lib/card-filter";
import { getLabelColorName } from "@/lib/labels";
import type { Label } from "@/types/board";
import type { User } from "@/types/user";

interface FilterPopoverProps {
  /** Nút mở popover */
  trigger: ReactNode;
  filter: CardFilter;
  onFilterChange: (filter: CardFilter) => void;
  members: User[];
  labels: Label[];
  currentUser: User;
}

function toggle(ids: number[], id: number): number[] {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

export function FilterPopover({
  trigger,
  filter,
  onFilterChange,
  members,
  labels,
  currentUser,
}: FilterPopoverProps) {
  const otherMembers = members.filter((user) => user.id !== currentUser.id);

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverPanel title="Lọc thẻ" className="w-85 gap-4 p-4">
        <FormField
          id="filter-keyword"
          label="Từ khóa"
          helper="Tìm theo tiêu đề thẻ"
        >
          <Input
            id="filter-keyword"
            aria-describedby="filter-keyword-message"
            placeholder="Nhập từ khóa…"
            value={filter.keyword}
            onChange={(event) =>
              onFilterChange({ ...filter, keyword: event.target.value })
            }
            className="h-8"
          />
        </FormField>

        <FilterGroup title="Người phụ trách">
          <FilterOption
            isChecked={filter.isUnassigned}
            onToggle={() =>
              onFilterChange({ ...filter, isUnassigned: !filter.isUnassigned })
            }
          >
            <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-neutral-subtle text-text-secondary">
              <UserIcon aria-hidden="true" className="size-3.5" />
            </span>
            Chưa có người phụ trách
          </FilterOption>
          {[currentUser, ...otherMembers].map((user) => (
            <FilterOption
              key={user.id}
              isChecked={filter.assigneeIds.includes(user.id)}
              onToggle={() =>
                onFilterChange({
                  ...filter,
                  assigneeIds: toggle(filter.assigneeIds, user.id),
                })
              }
            >
              <UserAvatar user={user} size="sm" />
              {user.id === currentUser.id ? "Thẻ được gán cho tôi" : user.name}
            </FilterOption>
          ))}
        </FilterGroup>

        <FilterGroup title="Nhãn">
          <FilterOption
            isChecked={filter.isUnlabeled}
            onToggle={() =>
              onFilterChange({ ...filter, isUnlabeled: !filter.isUnlabeled })
            }
          >
            <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-sm bg-neutral-subtle text-text-secondary">
              <Tag aria-hidden="true" className="size-3.5" />
            </span>
            Không có nhãn
          </FilterOption>
          {labels.map((label) => (
            <FilterOption
              key={label.id}
              isChecked={filter.labelIds.includes(label.id)}
              onToggle={() =>
                onFilterChange({
                  ...filter,
                  labelIds: toggle(filter.labelIds, label.id),
                })
              }
            >
              <LabelChip
                label={label}
                className="h-7 flex-1 px-2.5 text-sm font-medium"
              />
              {label.name === null && (
                <span className="sr-only">
                  Nhãn màu {getLabelColorName(label.color)}
                </span>
              )}
            </FilterOption>
          ))}
        </FilterGroup>

        <div className="border-t border-border pt-2">
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => onFilterChange(EMPTY_CARD_FILTER)}
          >
            Xóa bộ lọc
          </Button>
        </div>
      </PopoverPanel>
    </Popover>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-xs font-semibold text-text-secondary">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

interface FilterOptionProps {
  isChecked: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function FilterOption({ isChecked, onToggle, children }: FilterOptionProps) {
  return (
    <label className="-mx-1 flex cursor-pointer items-center gap-2.5 rounded-sm px-1 py-0.5 text-sm text-text-primary hover:bg-neutral-subtle">
      <Checkbox checked={isChecked} onCheckedChange={onToggle} />
      {children}
    </label>
  );
}
