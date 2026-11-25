import type { ComponentProps } from "react";
import { FormDialog } from "@/components/common/FormDialog";
import { FormField } from "@/components/common/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CreateWorkspaceDialogProps = Pick<
  ComponentProps<typeof FormDialog>,
  "trigger" | "open" | "onOpenChange"
>;

export function CreateWorkspaceDialog(props: CreateWorkspaceDialogProps) {
  return (
    <FormDialog
      {...props}
      title="Tạo Workspace"
      description="Workspace là nơi nhóm của bạn cùng quản lý các bảng công việc."
      submitLabel="Tạo Workspace"
    >
      <FormField id="new-workspace-name" label="Tên Workspace" required>
        <Input id="new-workspace-name" name="name" required maxLength={100} />
      </FormField>
      <FormField id="new-workspace-description" label="Mô tả (không bắt buộc)">
        <Textarea
          id="new-workspace-description"
          name="description"
          placeholder="Nhóm của chúng tôi cùng nhau tổ chức mọi thứ ở đây."
          className="min-h-20"
        />
      </FormField>
    </FormDialog>
  );
}
