import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: ReactNode;
}

/** Ô nhập bên trong trỏ aria-describedby tới `${id}-message` */
export function FormField({
  id,
  label,
  required = false,
  helper,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-text-secondary"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-danger">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-message`}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-danger"
        >
          <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : (
        helper && (
          <p id={`${id}-message`} className="text-xs text-text-subtle">
            {helper}
          </p>
        )
      )}
    </div>
  );
}
