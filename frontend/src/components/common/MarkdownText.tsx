import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownTextProps {
  children: string;
}

export function MarkdownText({ children }: MarkdownTextProps) {
  return (
    <div className="flex flex-col gap-2 text-sm wrap-break-word text-text-primary [&_a]:text-primary [&_a]:underline [&_code]:rounded-sm [&_code]:bg-black/6 [&_code]:px-1 [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:text-base [&_h2]:font-semibold [&_h3]:font-semibold [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_li+li]:mt-1">
      <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
    </div>
  );
}
