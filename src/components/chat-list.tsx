import type { UIState } from "@ai-rsc/app/actions";

export function ChatList({ messages }: { messages: UIState[number][] }) {
  // if (!messages.length) return null;

  return (
    <div className="relative px-3 mx-auto md:max-w-4xl xl:max-w-6xl min-[1500px]:max-w-7xl flex flex-col">
      {messages.map((message, index) => (
        <div key={index} className="pb-8">
          {message.display}
        </div>
      ))}
    </div>
  );
}
