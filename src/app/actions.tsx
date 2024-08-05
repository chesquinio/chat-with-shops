"use server";

import { BotCard, BotMessage } from "@/components/ui/message";
import { openai } from "@ai-sdk/openai";
import { generateObject, type CoreMessage, type ToolInvocation } from "ai";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { z } from "zod";
import { getAllProducts } from "./data";
import ProductsList from "@/components/ui/products-list";
import { ProductsListSkeleton } from "@/components/skeletons/products-list-sckeleton";
import BetterProduct from "@/components/ui/better-product";
import { BetterProductSkeleton } from "@/components/skeletons/better-product-sckeleton";

const content = `\
  You are an assistant for choosing products, I want you to advise users where they should buy
  Depending on the prices of the products provided to you, I want you to make different recommendations
  depending on the brand or size of the product with respect to the price.

  If the user wants see all the products, call \`show_all_products\` to show the products.
  If the user wants know where buy the product cheapest or know something specific about a product e.g. where 
  sell the Coca Cola cheapest., call \`analize_products\` to answer the question. Always you need a product name, 
  if the user anwer for a cheapest product and don't put one, ask for a product name. Also, can ask for a specific brand if you want. Don't ask for a specific shop for this function.

  Besides that, you can also chat with users and do some calculations if needed.`;
export async function sendMessage(message: string): Promise<{
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
}> {
  const MAX_HISTORY_LENGTH = 2;

  const history = getMutableAIState<typeof AI>();
  const messages = history.get();
  const recentMessages = messages.slice(-MAX_HISTORY_LENGTH);

  history.update([...recentMessages, { role: "user", content: message }]);

  const reply = await streamUI({
    model: openai("gpt-3.5-turbo"),
    messages: [
      {
        role: "system",
        content,
        toolInvocations: [],
      },
      ...history.get(),
    ] as CoreMessage[],
    initial: (
      <BotMessage className="flex shrink-0 select-none justify-center items-center mx-auto">
        <Loader2 className="h-5 w-5 animate-spin stroke-zinc-900" />
      </BotMessage>
    ),
    text: ({ content, done }) => {
      if (done)
        history.done([...history.get(), { role: "assistant", content }]);

      return <BotMessage>{content}</BotMessage>;
    },
    tools: {
      show_all_products: {
        description: "This show all the products finded with the product name.",
        parameters: z.object({
          product_name: z
            .string()
            .describe(
              'This is the name of a product or the brand of a product used to compare all the products that stores with that name have. For exmple: "Coca cola", "Queso", "Leche"'
            ),
          specific_shop: z
            .string()
            .describe(
              `This is the name of the following stores "La Anónima", "Pingüino", "Libertad" or "Flaming". It may or may not be in the message. It can be written without capital letters or without accents, but you must always show it as in the previous examples.`
            )
            .optional(),
        }),
        generate: async function* ({
          product_name,
          specific_shop,
        }: {
          product_name: string;
          specific_shop?: string;
        }) {
          yield (
            <BotCard showAvatar={false}>
              <ProductsListSkeleton />
            </BotCard>
          );

          const productsByShop = await getAllProducts({
            query: product_name,
            specific_shop,
          });

          history.done([
            ...history.get(),
            {
              role: "assistant",
              name: "show_all_products",
              content: `Show all the products for ${product_name}`,
            },
          ]);

          return (
            <BotCard showAvatar={false}>
              <ProductsList productsByShop={productsByShop} />
            </BotCard>
          );
        },
      },
      analize_products: {
        description: "This show the products cheapest of each category.",
        parameters: z.object({
          product_name: z
            .string()
            .describe(
              'This is the name of a product or the brand of a product used to compare all the products that stores with that name have. For example: "Coca cola", "Queso", "Leche"'
            ),
          request: z
            .string()
            .describe(
              `This will be the customer's request, for example, if the user wants the cheapest Coca Cola, you should retrieve "cheapest"; or if the user asks for the best price/quantity milk, you should retrieve "best price/quality"; or the product more expensive, you should retrieve "expensive"`
            ),
          specific_shop: z
            .string()
            .describe(
              `This is the name of the following stores "La Anónima", "Pingüino", "Libertad" or "Flaming". It may or may not be in the message. It can be written without capital letters or without accents, but you must always show it as in the previous examples.`
            )
            .optional(),
        }),
        generate: async function* ({
          product_name,
          request,
          specific_shop,
        }: {
          product_name: string;
          request: string;
          specific_shop?: string;
        }) {
          yield (
            <BotCard>
              <BetterProductSkeleton />
            </BotCard>
          );

          const productsByShop = await getAllProducts({
            query: product_name,
            specific_shop,
          });
          const productData = JSON.stringify(productsByShop);

          history.done([
            ...history.get(),
            {
              role: "assistant",
              name: "analize_products",
              content: `Analyzing these product lists: ${JSON.stringify(
                productData
              )}.`,
            },
          ]);

          const { object } = await generateObject({
            model: openai("gpt-3.5-turbo"),
            system: `You are an assistant`,
            schema: z.object({
              conclusion: z
                .string()
                .describe(
                  `This is a simple and concise conclusion about what product you should buy and what store it is in. Do not add the full name of the product to this conclusion, just name the short name, e.g. (in the case of product_name "Coca Cola 1.5 liters", the request "cheaper", and the price of the "cheapest" product in each store be [598, 653, 1903, 978]) "The 1.5 liter Coca Cola from La Anónima is the cheapest of all, worth $598.". The conclusion has to name only a product with its price and place where it is purchased.`
                ),
              shops: z
                .array(
                  z.object({
                    product: z.object({
                      id: z.string(),
                      title: z.string(),
                      price: z
                        .string()
                        .describe("Just the number, without the $ symbol."),
                      vendor: z.string(),
                      image: z.string(),
                      link: z.string(),
                    }),
                  })
                )
                .describe(`all stores with the ${request} product`),
            }),
            prompt: `
                      Analyze the following products and answer what the product ${request} is for each store: ${JSON.stringify(
              productData
            )}.
                      Analyze the prices of all products in each store to determine what the ${request} is.

                      You must respond with the product ${request} from each store. This is very important. Among the 4 vendors, you cannot repeat any vendors; you can only show one product from each seller, with a maximum of 4 products. If possible, always aim to show 4 products, even if some stores do not have products that match the request. Consider the price of each product to correctly determine the ${request} from each store.

                      Before drawing a conclusion, you should always analyze and save the product ${request} from each store. Then, from these products, we can determine the ${request}. Do not draw a conclusion without knowing the price of all the products. If a store does not have the requested product or it is not related to what the user ordered, do not consider that store.

                      Always respond in Spanish.
                      `,
          });

          return (
            <BotCard>
              <BetterProduct object={object} />
            </BotCard>
          );
        },
      },
    },
    temperature: 0,
  });

  return {
    id: Date.now(),
    role: "assistant" as const,
    display: reply.value,
  };
}
// Define the AI state and UI state types
export type AIState = Array<{
  id?: number;
  name?: "analize_products" | "show_all_products";
  role: "user" | "assistant" | "system";
  content: string;
}>;

export type UIState = Array<{
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
  toolInvocations?: ToolInvocation[];
}>;

// Create the AI provider with the initial states and allowed actions
export const AI = createAI({
  initialAIState: [] as AIState,
  initialUIState: [] as UIState,
  actions: {
    sendMessage,
  },
});
