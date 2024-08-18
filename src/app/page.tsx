"use client";

export const maxDuration = 30;

import { ChatList } from "@ai-rsc/components/chat-list";
import { UserMessage } from "@/components/ui/message";
import { Button } from "@ai-rsc/components/ui/button";
import type { ChatInputs } from "@ai-rsc/lib/chat-schema";
import { useEnterSubmit } from "@ai-rsc/lib/use-enter-submit";
import { useForm } from "@ai-rsc/lib/use-form";
import { useActions, useUIState } from "ai/rsc";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { SubmitHandler } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import type { AI } from "./actions";
import { EmptyScreen } from "@/components/ui/empty-screen";
import { useCartContext } from "@/context/cart-context";

export default function Home() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { openCart, cartQuantity } = useCartContext();

  const form = useForm<ChatInputs>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        if (
          e.target &&
          ["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).nodeName)
        ) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);

  const submitHandler: SubmitHandler<ChatInputs> = async (data) => {
    const value = data.message.trim();
    formRef.current?.reset();
    if (!value) return;

    setMessages([
      {
        id: Date.now(),
        role: "user",
        display: <UserMessage>{value}</UserMessage>,
      },
    ]);

    try {
      const responseMessage = await sendMessage(value);

      setMessages((currentMessages) => [...currentMessages, responseMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  const exampleMessages = [
    {
      message: `Muestrame todos los productos de Caramelos`,
    },
    {
      message: `Dónde se encuentra el Vino Blanco más económico?`,
    },
    {
      message: `Quiero el listado de Cervezas en La Anónima`,
    },
    {
      message: `Algún supermercado vende Galletitas?`,
    },
  ];

  return (
    <main className="min-h-dvh">
      <div className="pb-8 pt-32">
        {messages.length ? <ChatList messages={messages} /> : <EmptyScreen />}

        {/* <ChatScrollAnchor trackVisibility={true} /> */}
      </div>
      <div className="fixed z-20 inset-x-0 top-0 pt-8 h-28 w-full bg-white bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex flex-row">
            <div className="flex justify-center w-full flex-row shadow-lg bg-background rounded-full border p-1 gap-2 bg-white">
              <div className="flex justify-center items-center">
                <Button
                  variant="outline"
                  type="button"
                  size="lg"
                  className="px-3 py-4 bg-background rounded-full border-none"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.reload();
                  }}
                >
                  <PlusIcon className="w-5 h-5" />
                </Button>
              </div>
              <form
                ref={formRef}
                onSubmit={form.handleSubmit(submitHandler)}
                className="w-full"
              >
                <div className="relative flex flex-col w-full overflow-hidden grow bg-background rounded-full">
                  <TextareaAutosize
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    placeholder="Busca un producto."
                    className="min-h-[40px] resize-none bg-transparent pl-2 pr-16 py-3 focus-within:outline-none text-sm"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    rows={1}
                    {...form.register("message")}
                  />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2">
                    <Button
                      type="submit"
                      className="rounded-full"
                      size="icon"
                      disabled={
                        form.watch("message") === "" ||
                        form.watch("message") === undefined
                      }
                    >
                      <ArrowDownIcon className="w-5 h-5" />
                      <span className="sr-only">Busca un producto.</span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="hidden relative md:block my-auto w-10 ml-3">
              <Button
                className="group px-2.5 border bg-transparent border-indigo-400 hover:border-indigo-600 hover:bg-transparent z-30 rounded-full"
                disabled={messages.length <= 0}
                onClick={() => openCart()}
              >
                <ShoppingCartIcon className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600 transition-all" />
              </Button>
              {cartQuantity > 0 && (
                <span className="flex items-center justify-center absolute bg-red-500 rounded-full w-6 h-6 text-sm text-white -bottom-2 -right-2">
                  {cartQuantity}
                </span>
              )}
            </div>
            {messages.length > 0 && (
              <div className="fixed md:hidden bottom-8 right-5">
                <Button
                  className="group bg-indigo-600 hover:bg-indigo-500 z-30 h-14 w-14 rounded-full"
                  onClick={() => openCart()}
                >
                  <ShoppingCartIcon className="w-8 h-8 text-white" />
                </Button>
                {cartQuantity > 0 && (
                  <span className="flex items-center justify-center absolute bg-red-500 rounded-full w-6 h-6 text-sm text-white -bottom-1 -right-1">
                    {cartQuantity}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 mt-5">
            {(form.watch("message") === "" ||
              form.watch("message") === undefined) &&
              messages.length === 0 && (
                <>
                  <h4 className="text-gray-600 ml-5 mb-2">
                    Puedes intentar con:
                  </h4>
                  {exampleMessages.map((example, index) => (
                    <div
                      key={example.message}
                      className={`flex flex-row items-start gap-2 cursor-pointer bg-white px-4 text-gray-700 hover:text-gray-950 ${
                        index > 1 && "hidden md:flex"
                      }`}
                      onClick={async () => {
                        setMessages([
                          {
                            id: Date.now(),
                            role: "user",
                            display: (
                              <UserMessage>{example.message}</UserMessage>
                            ),
                          },
                        ]);

                        const responseMessage = await sendMessage(
                          example.message
                        );

                        setMessages((currentMessages) => [
                          ...currentMessages,
                          responseMessage,
                        ]);
                      }}
                    >
                      <ArrowRightIcon className="w-5 h-5 pt-1" />
                      <p className="font-semibold relative group">
                        {example.message}
                        <span className="hidden md:block absolute left-0 bottom-0 w-0 h-[2px] bg-gray-600 transition-all duration-200 ease-out group-hover:w-full"></span>
                      </p>
                    </div>
                  ))}
                </>
              )}
          </div>
        </div>
      </div>
    </main>
  );
}
