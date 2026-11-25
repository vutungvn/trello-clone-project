import { type ReactNode, useState } from "react";
import { PopoverPanel } from "@/components/common/PopoverPanel";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import type { Workspace } from "@/types/workspace";
import { CreateBoardForm } from "./CreateBoardForm";

interface CreateBoardPopoverProps {
  /** Nút mở popover */
  trigger: ReactNode;
  workspaces: Workspace[];
  defaultWorkspaceId: number;
}

export function CreateBoardPopover({
  trigger,
  workspaces,
  defaultWorkspaceId,
}: CreateBoardPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverPanel title="Tạo bảng" side="right" className="w-90">
        <CreateBoardForm
          workspaces={workspaces}
          defaultWorkspaceId={defaultWorkspaceId}
          onClose={() => setIsOpen(false)}
        />
      </PopoverPanel>
    </Popover>
  );
}
