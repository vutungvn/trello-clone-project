import { FormField } from "@/components/common/FormField";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User } from "@/types/user";

interface BasicInfoCardProps {
  user: User;
}

export function BasicInfoCard({ user }: BasicInfoCardProps) {
  return (
    <SectionCard title="Thông tin cơ bản" titleSize="sm">
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-4"
      >
        <FormField id="profile-name" label="Tên hiển thị">
          <Input
            id="profile-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            defaultValue={user.name}
          />
        </FormField>
        <FormField
          id="profile-email"
          label="Email"
          helper="Email không thể thay đổi"
        >
          <Input
            id="profile-email"
            type="email"
            disabled
            value={user.email}
            aria-describedby="profile-email-message"
          />
        </FormField>
        <div className="mt-1 flex items-center justify-end gap-2 border-t border-border pt-4">
          <Button type="reset" variant="ghost">
            Hủy
          </Button>
          <Button type="submit">Lưu thay đổi</Button>
        </div>
      </form>
    </SectionCard>
  );
}
