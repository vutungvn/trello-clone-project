import { useState } from "react";
import { Check, Lock, Users } from "lucide-react";
import { FormField } from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BOARD_BACKGROUND_CLASS,
  BOARD_BACKGROUND_IMAGES,
  BOARD_BACKGROUNDS,
  type BoardBackgroundChoice,
} from "@/lib/board-backgrounds";
import { cn } from "@/lib/utils";
import type { BoardVisibility } from "@/types/board";
import type { Workspace } from "@/types/workspace";
import { BoardThumbnail } from "./BoardThumbnail";

const VISIBILITY_OPTIONS = [
  {
    value: "WORKSPACE",
    label: "Workspace",
    description: "Mọi thành viên workspace đều xem được",
    icon: Users,
    iconClass: "text-primary",
  },
  {
    value: "PRIVATE",
    label: "Riêng tư",
    description: "Chỉ thành viên được thêm vào bảng",
    icon: Lock,
    iconClass: "text-danger",
  },
] satisfies { value: BoardVisibility; [key: string]: unknown }[];

const SWATCH_CLASS =
  "overflow-hidden rounded-sm outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-text-primary aria-pressed:ring-2 aria-pressed:ring-focus-ring aria-pressed:ring-offset-1";

interface CreateBoardFormProps {
  workspaces: Workspace[];
  defaultWorkspaceId?: number;
  onClose: () => void;
}

export function CreateBoardForm({
  workspaces,
  defaultWorkspaceId = workspaces[0]?.id,
  onClose,
}: CreateBoardFormProps) {
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState<string>("WORKSPACE");
  const [background, setBackground] = useState<BoardBackgroundChoice>({
    backgroundColor: "blue",
    backgroundImageUrl: null,
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="flex flex-col gap-3"
    >
      <div className="flex justify-center">
        <BoardThumbnail background={background} />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-xs font-semibold text-text-secondary">
          Phông nền
        </legend>
        <div className="grid grid-cols-4 gap-1.5">
          {BOARD_BACKGROUND_IMAGES.map((image) => (
            <button
              key={image.url}
              type="button"
              aria-label={`Ảnh nền ${image.name}`}
              aria-pressed={background.backgroundImageUrl === image.url}
              onClick={() =>
                setBackground({ ...background, backgroundImageUrl: image.url })
              }
              className={cn("h-10 border border-border", SWATCH_CLASS)}
            >
              <img src={image.url} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {BOARD_BACKGROUNDS.map((color) => {
            const isSelected =
              background.backgroundImageUrl === null &&
              background.backgroundColor === color.value;
            return (
              <button
                key={color.value}
                type="button"
                aria-label={`Màu ${color.name}`}
                aria-pressed={isSelected}
                onClick={() =>
                  setBackground({
                    backgroundColor: color.value,
                    backgroundImageUrl: null,
                  })
                }
                className={cn(
                  "inline-flex h-8 items-center justify-center text-on-primary",
                  SWATCH_CLASS,
                  BOARD_BACKGROUND_CLASS[color.value],
                )}
              >
                {isSelected && <Check aria-hidden="true" className="size-4" />}
              </button>
            );
          })}
        </div>
      </fieldset>

      <FormField id="board-title" label="Tiêu đề bảng" required>
        <Input
          id="board-title"
          name="title"
          required
          maxLength={255}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="h-8"
        />
      </FormField>

      <FormField id="board-workspace" label="Workspace">
        <Select
          name="workspaceId"
          defaultValue={defaultWorkspaceId?.toString()}
        >
          <SelectTrigger id="board-workspace" size="sm" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            {workspaces.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id.toString()}>
                {workspace.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField id="board-visibility" label="Quyền xem">
        <Select
          name="visibility"
          value={visibility}
          onValueChange={setVisibility}
        >
          <SelectTrigger id="board-visibility" size="sm" className="w-full">
            <SelectValue>
              {
                VISIBILITY_OPTIONS.find((option) => option.value === visibility)
                  ?.label
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent position="popper">
            {VISIBILITY_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="data-[state=checked]:bg-primary-soft"
              >
                <option.icon
                  aria-hidden="true"
                  className={option.iconClass}
                />
                <span className="flex flex-col">
                  <span className="font-semibold">{option.label}</span>
                  <span className="text-xs text-text-secondary">
                    {option.description}
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <Button
        type="submit"
        disabled={title.trim() === ""}
        className="w-full"
      >
        Tạo bảng
      </Button>
    </form>
  );
}
