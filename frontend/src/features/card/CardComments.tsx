import { MessageSquare } from "lucide-react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatRelativeTime } from "@/lib/date";
import type { Comment } from "@/types/card";
import type { User } from "@/types/user";

interface CardCommentsProps {
  /** Mới nhất đứng trước */
  comments: Comment[];
  currentUser: User;
  now: Date;
}

export function CardComments({
  comments,
  currentUser,
  now,
}: CardCommentsProps) {
  return (
    <section aria-labelledby="card-comments" className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <MessageSquare
          aria-hidden="true"
          className="size-6 shrink-0 text-text-secondary"
        />
        <h3
          id="card-comments"
          className="text-base leading-6 font-semibold text-text-primary"
        >
          Bình luận
        </h3>
      </div>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex items-start gap-2.5"
      >
        <UserAvatar user={currentUser} className="mt-0.5" />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
          <Textarea
            name="content"
            aria-label="Bình luận"
            placeholder="Viết bình luận…"
          />
          <Button type="submit" className="px-4">
            Gửi
          </Button>
        </div>
      </form>

      <ul className="flex flex-col gap-4">
        {comments.map((comment) => (
          <li key={comment.id} className="flex items-start gap-2.5">
            <UserAvatar user={comment.user} className="mt-0.5" />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-text-primary">
                  {comment.user.name}
                </span>
                <time
                  dateTime={comment.createdAt}
                  className="text-xs text-text-secondary"
                >
                  {formatRelativeTime(comment.createdAt, now)}
                </time>
              </div>
              <p className="rounded-lg bg-surface px-3 py-2 text-sm wrap-break-word whitespace-pre-wrap text-text-primary shadow-[0_1px_1px_#091E4240]">
                {comment.content}
              </p>
              {comment.user.id === currentUser.id && (
                <ConfirmDialog
                  title="Xóa bình luận này?"
                  description="Bình luận sẽ bị xóa vĩnh viễn."
                  trigger={
                    <button
                      type="button"
                      className="self-start rounded-sm px-1 text-xs text-text-secondary underline outline-none hover:text-danger focus-visible:ring-2 focus-visible:ring-focus-ring"
                    >
                      Xóa
                    </button>
                  }
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
