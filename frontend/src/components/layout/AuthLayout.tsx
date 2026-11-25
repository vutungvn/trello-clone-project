import type { ReactNode } from "react";
import { AppLogo } from "@/components/common/AppLogo";
import { AuthIllustrations } from "./AuthIllustrations";

interface AuthLayoutProps {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
}

export function AuthLayout({
  title,
  description,
  footer,
  children,
}: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#FAFBFC] p-6">
      <AuthIllustrations />

      <main className="relative z-10 flex w-100 max-w-full flex-col gap-6 rounded-sm bg-surface px-10 py-8 shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <header className="flex flex-col items-center gap-2 text-center">
          <div className="mb-1">
            <AppLogo size="lg" />
          </div>
          <h1 className="text-lg leading-6 font-bold text-text-primary">
            {title}
          </h1>
          <p className="text-sm text-pretty text-text-secondary">
            {description}
          </p>
        </header>

        {children}

        <footer className="border-t border-border pt-3 text-center text-sm text-text-secondary">
          {footer}
        </footer>
      </main>
    </div>
  );
}
