import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Column {
  label: string;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  /** Hiện thay cho các dòng khi không có dữ liệu */
  emptyText: string;
  isEmpty: boolean;
  children: ReactNode;
}

/** Khung bảng, cột cuối luôn là cột hành động */
export function DataTable({
  columns,
  emptyText,
  isEmpty,
  children,
}: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-column">
            {columns.map((column) => (
              <th
                key={column.label}
                scope="col"
                className={cn(
                  "px-4 py-2.5 text-xs font-semibold whitespace-nowrap text-text-secondary",
                  column.className,
                )}
              >
                {column.label}
              </th>
            ))}
            <th scope="col" className="px-4 py-2.5">
              <span className="sr-only">Hành động</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {isEmpty ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-6 text-center text-text-secondary"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}
