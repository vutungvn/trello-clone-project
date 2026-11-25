import { useState } from "react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WorkspaceMember } from "@/types/workspace";

interface TransferOwnershipCardProps {
  /** Quản trị viên của workspace */
  admins: WorkspaceMember[];
}

export function TransferOwnershipCard({ admins }: TransferOwnershipCardProps) {
  const [selectedId, setSelectedId] = useState("");
  const selectedAdmin = admins.find(
    (admin) => admin.id.toString() === selectedId,
  );

  return (
    <SectionCard
      title="Chuyển quyền sở hữu"
      description="Chuyển quyền chủ sở hữu cho một quản trị viên khác. Bạn sẽ trở thành quản trị viên."
    >
      <div className="flex flex-wrap items-center gap-3">
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger
            aria-label="Chọn thành viên"
            className="min-w-60 flex-1"
          >
            <SelectValue placeholder="Chọn thành viên" />
          </SelectTrigger>
          <SelectContent position="popper">
            {admins.map((admin) => (
              <SelectItem key={admin.id} value={admin.id.toString()}>
                {admin.user.name} ({admin.user.email})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ConfirmDialog
          title={`Chuyển quyền sở hữu cho ${selectedAdmin?.user.name}?`}
          description="Bạn sẽ trở thành quản trị viên và không tự lấy lại được quyền sở hữu."
          confirmLabel="Chuyển quyền"
          trigger={
            <Button variant="secondary" disabled={!selectedAdmin}>
              Chuyển quyền
            </Button>
          }
        />
      </div>
    </SectionCard>
  );
}
