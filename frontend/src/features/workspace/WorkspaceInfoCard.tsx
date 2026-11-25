import { FormField } from "@/components/common/FormField";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Workspace } from "@/types/workspace";

interface WorkspaceInfoCardProps {
  workspace: Workspace;
  canEdit: boolean;
}

export function WorkspaceInfoCard({
  workspace,
  canEdit,
}: WorkspaceInfoCardProps) {
  return (
    <SectionCard
      title="Thông tin chung"
      description={
        canEdit
          ? undefined
          : "Chỉ chủ sở hữu và quản trị viên mới sửa được thông tin workspace."
      }
    >
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-4"
      >
        <FormField id="workspace-name" label="Tên Workspace">
          <Input
            id="workspace-name"
            name="name"
            required
            maxLength={100}
            disabled={!canEdit}
            defaultValue={workspace.name}
          />
        </FormField>
        <FormField id="workspace-description" label="Mô tả">
          <Textarea
            id="workspace-description"
            name="description"
            disabled={!canEdit}
            defaultValue={workspace.description ?? ""}
            className="min-h-20"
          />
        </FormField>
        {canEdit && (
          <div className="flex justify-end pt-2">
            <Button type="submit">Lưu thay đổi</Button>
          </div>
        )}
      </form>
    </SectionCard>
  );
}
