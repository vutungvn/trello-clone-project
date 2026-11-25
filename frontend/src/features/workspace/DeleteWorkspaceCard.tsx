import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import type { Workspace } from "@/types/workspace";

interface DeleteWorkspaceCardProps {
  workspace: Workspace;
  /** Gồm cả bảng đã lưu trữ */
  boardCount: number;
}

export function DeleteWorkspaceCard({
  workspace,
  boardCount,
}: DeleteWorkspaceCardProps) {
  return (
    <SectionCard
      tone="danger"
      title="Vùng nguy hiểm"
      description="Xóa workspace sẽ xóa vĩnh viễn toàn bộ bảng, danh sách, thẻ và bình luận. Không thể hoàn tác."
    >
      <ConfirmDialog
        title={`Xóa Workspace “${workspace.name}”?`}
        description={`Hành động này sẽ xóa vĩnh viễn ${boardCount} bảng và toàn bộ dữ liệu bên trong. Không thể hoàn tác.`}
        confirmLabel="Xóa vĩnh viễn"
        confirmText={workspace.name}
        trigger={
          <Button variant="destructive" className="self-start">
            Xóa Workspace
          </Button>
        }
      />
    </SectionCard>
  );
}
