import { useState } from "react";
import { Kanban, Users } from "lucide-react";
import { PopoverPanel } from "@/components/common/PopoverPanel";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { CreateBoardForm } from "@/features/board/CreateBoardForm";
import { CreateWorkspaceDialog } from "@/features/workspace/CreateWorkspaceDialog";
import type { Workspace } from "@/types/workspace";

const OPTION_CLASS =
  "flex w-full flex-col gap-1 rounded-sm px-2.5 py-2 text-left outline-none hover:bg-neutral-subtle focus-visible:bg-neutral-subtle disabled:pointer-events-none disabled:opacity-50";

interface CreateMenuProps {
  workspaces: Workspace[];
}

/** Nút "Tạo" ở header: tạo bảng hoặc workspace */
export function CreateMenu({ workspaces }: CreateMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [isWorkspaceDialogOpen, setIsWorkspaceDialogOpen] = useState(false);

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    setIsCreatingBoard(false);
  }

  return (
    <>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button>Tạo</Button>
        </PopoverTrigger>
        {isCreatingBoard ? (
          <PopoverPanel
            title="Tạo bảng"
            onBack={() => setIsCreatingBoard(false)}
            className="w-90"
          >
            <CreateBoardForm
              workspaces={workspaces}
              onClose={() => handleOpenChange(false)}
            />
          </PopoverPanel>
        ) : (
          <PopoverPanel title="Tạo">
            <div className="flex flex-col gap-1">
              <button
                type="button"
                disabled={workspaces.length === 0}
                onClick={() => setIsCreatingBoard(true)}
                className={OPTION_CLASS}
              >
                <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <Kanban
                    aria-hidden="true"
                    className="size-4 text-text-secondary"
                  />
                  Tạo bảng
                </span>
                <span className="text-xs text-text-secondary">
                  Bảng gồm các danh sách và thẻ công việc.
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleOpenChange(false);
                  setIsWorkspaceDialogOpen(true);
                }}
                className={OPTION_CLASS}
              >
                <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <Users
                    aria-hidden="true"
                    className="size-4 text-text-secondary"
                  />
                  Tạo Workspace
                </span>
                <span className="text-xs text-text-secondary">
                  Workspace là nơi nhóm cùng quản lý các bảng.
                </span>
              </button>
            </div>
          </PopoverPanel>
        )}
      </Popover>

      <CreateWorkspaceDialog
        open={isWorkspaceDialogOpen}
        onOpenChange={setIsWorkspaceDialogOpen}
      />
    </>
  );
}
