import { Card, CardContent, CardHeader } from "@ai-rsc/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const ProductSkeleton = () => {
  return (
    <Card className="relative w-full md:w-[39.5rem] overflow-hidden border rounded-lg mb-10">
      <CardHeader className="flex items-center justify-center py-4 border-b">
        <div className="text-transparent w-32 h-8 animate-pulse bg-zinc-700 border-b rounded-md">
          xxxxxxxxxx
        </div>
        <div className="absolute top-3 flex justify-between text-gray-400 w-full px-4">
          <ChevronLeftIcon className="w-6 h-6" />
          <ChevronRightIcon className="w-6 h-6" />
        </div>
      </CardHeader>
      <CardContent className="relative w-full h-[300px] md:h-[400px] p-0">
        <div className="absolute hidden sm:flex w-full top-1/2 -translate-y-1/2 justify-between text-gray-400 px-4">
          <ArrowLeftIcon className="w-8 h-8 border rounded-lg p-1.5" />
          <ArrowRightIcon className="w-8 h-8 border rounded-lg p-1.5" />
        </div>
        <div className="absolute bottom-6 left-5">
          <div className="text-transparent w-52 h-6 mb-2 animate-pulse bg-zinc-700 border-b rounded-md">
            xxxxxxxxxx
          </div>
          <div className="text-transparent w-20 h-6 animate-pulse bg-zinc-700 border-b rounded-md">
            xxxxxxxxxx
          </div>
        </div>
      </CardContent>
    </Card>
  );
};