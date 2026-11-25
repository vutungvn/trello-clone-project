import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";

interface AvatarCardProps {
  user: User;
}

export function AvatarCard({ user }: AvatarCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Chỉ xem trước trên trang này, chưa tải lên
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

  const openFilePicker = () => fileInputRef.current?.click();

  return (
    <SectionCard title="Ảnh đại diện" titleSize="sm">
      <div className="flex flex-wrap items-center gap-6">
        <div className="relative shrink-0">
          <UserAvatar user={{ ...user, avatarUrl }} size="2xl" />
          <button
            type="button"
            aria-label="Cập nhật ảnh đại diện"
            onClick={openFilePicker}
            className="absolute right-0 bottom-0 inline-flex size-7 items-center justify-center rounded-full border border-border bg-surface text-text-secondary shadow-[0_1px_2px_rgba(9,30,66,0.18)] transition-colors duration-100 outline-none hover:bg-neutral-subtle focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <Camera aria-hidden="true" className="size-3.5" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={openFilePicker}>
              Đổi ảnh
            </Button>
            <Button
              variant="ghost"
              disabled={avatarUrl === null}
              onClick={() => setAvatarUrl(null)}
            >
              Xóa ảnh
            </Button>
          </div>
          <p className="text-xs text-text-subtle">JPG, PNG, tối đa 2MB</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) setAvatarUrl(URL.createObjectURL(file));
            event.target.value = "";
          }}
        />
      </div>
    </SectionCard>
  );
}
