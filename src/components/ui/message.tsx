import { cn } from "@ai-rsc/lib/utils";
import { Sparkle, UserIcon } from "lucide-react";

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex space-x-3 items-starts max-w-2xl mx-auto px-6">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-background">
        <UserIcon />
      </div>
      <div className="flex-1 overflow-hidden text-gray-700 font-medium sm:text-xl">
        {children}
      </div>
    </div>
  );
}

export function BotMessage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group max-w-2xl relative flex items-center justify-center mx-auto",
        className
      )}
    >
      {/* <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground">
        <Sparkle />
      </div> */}
      <div className="overflow-hidden px-1">{children}</div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div>
      {/* <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground",
          !showAvatar && "invisible"
        )}
      >
        <Sparkle />
      </div> */}
      <div className="-mt-8 flex-1 px-1">{children}</div>
    </div>
  );
}

export function AssistantMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "mt-2 flex items-center justify-center gap-2 text-xs text-gray-500"
      }
    >
      <div className={"max-w-[600px] flex-initial px-2 py-2"}>{children}</div>
    </div>
  );
}
