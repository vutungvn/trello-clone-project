import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateWorkspaceDialog } from "./CreateWorkspaceDialog";

const COLUMN = {
  y: 42,
  width: 52,
  height: 78,
  rx: 6,
  fill: "#FFFFFF",
  stroke: "#8590A2",
  strokeWidth: 1.5,
};

const CARD = {
  width: 40,
  rx: 4,
  fill: "#FFFFFF",
  stroke: "#8590A2",
  strokeWidth: 1.5,
};

const LINE = { height: 3, rx: 1.5 };
const TITLE = { y: 49, height: 4, rx: 2, fill: "#172B4D", fillOpacity: 0.4 };

export function WelcomeEmptyState() {
  return (
    <div className="flex min-h-150 flex-col items-center justify-center text-center">
      <div className="flex max-w-md flex-col items-center gap-4">
        <div className="mb-2">
          <KanbanIllustration />
        </div>
        <h1 className="text-xl leading-6 font-bold text-text-primary">
          Chào mừng đến với TaskFlow!
        </h1>
        <p className="text-sm text-balance text-text-secondary">
          Tạo workspace đầu tiên để bắt đầu quản lý công việc cùng nhóm của bạn.
        </p>
        <CreateWorkspaceDialog
          trigger={
            <Button className="mt-2 px-4">
              <Plus aria-hidden="true" />
              Tạo Workspace
            </Button>
          }
        />
      </div>
    </div>
  );
}

function KanbanIllustration() {
  return (
    <svg
      width="220"
      height="144"
      viewBox="0 0 220 144"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="10"
        y="12"
        width="200"
        height="120"
        rx="10"
        fill="#F1F2F4"
        stroke="#8590A2"
        strokeWidth="2"
      />
      <path
        d="M10 22C10 16.4772 14.4772 12 20 12H200C205.523 12 210 16.4772 210 22V32H10V22Z"
        fill="#E9F2FF"
      />
      <line x1="10" y1="32" x2="210" y2="32" stroke="#8590A2" strokeWidth="2" />
      <circle cx="24" cy="22" r="3" fill="#0C66E4" />
      <rect
        x="34"
        y="19"
        width="44"
        height="6"
        rx="3"
        fill="#0C66E4"
        fillOpacity="0.35"
      />

      {/* Cột 1 */}
      <rect x="22" {...COLUMN} />
      <rect x="28" width="26" {...TITLE} />
      <rect x="28" y="59" height="18" {...CARD} fill="#E9F2FF" stroke="#0C66E4" />
      <rect x="32" y="64" width="16" {...LINE} fill="#9F8FEF" />
      <rect x="28" y="83" height="18" {...CARD} />
      <rect x="32" y="88" width="24" {...LINE} fill="#172B4D" fillOpacity="0.25" />

      {/* Cột 2 */}
      <rect x="84" {...COLUMN} />
      <rect x="90" width="28" {...TITLE} />
      <rect x="90" y="59" height="22" {...CARD} />
      <rect x="94" y="64" width="14" {...LINE} fill="#4BCE97" />
      <rect x="94" y="71" width="28" {...LINE} fill="#172B4D" fillOpacity="0.25" />
      <rect x="90" y="87" height="16" {...CARD} strokeDasharray="3 3" />

      {/* Cột 3 */}
      <rect x="146" {...COLUMN} />
      <rect x="152" width="24" {...TITLE} />
      <rect x="152" y="59" height="18" {...CARD} />
      <rect x="156" y="64" width="18" {...LINE} fill="#FEA362" />
      <circle cx="182" cy="70" r="3.5" fill="#0C66E4" />
    </svg>
  );
}
