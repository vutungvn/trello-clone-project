import { AppHeader } from "@/components/layout/AppHeader";
import { AvatarCard } from "@/features/profile/AvatarCard";
import { BasicInfoCard } from "@/features/profile/BasicInfoCard";
import { currentUser } from "@/mocks";

export function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFBFC]">
      <title>Hồ sơ cá nhân — TaskFlow</title>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-180 flex-1 flex-col gap-6 px-6 py-10">
        <header className="flex flex-col gap-1">
          <h1 className="text-xl leading-6 font-bold text-text-primary">
            Hồ sơ cá nhân
          </h1>
          <p className="text-sm text-text-secondary">
            Quản lý thông tin hiển thị của bạn
          </p>
        </header>
        <AvatarCard user={currentUser} />
        <BasicInfoCard user={currentUser} />
      </main>
    </div>
  );
}
