export const ProductsListSkeleton = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-lg md:max-w-2xl px-4 py-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <section className="py-6">
          <div className="text-transparent w-32 h-8 animate-pulse bg-zinc-700 border-b rounded-md mb-6">
            xxxxxxxxxx
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
            <div className="w-full h-60 p-5 animate-pulse bg-zinc-300 border-b rounded-md"></div>
            <div className="hidden md:block w-full h-60 p-5 animate-pulse bg-zinc-300 border-b rounded-md"></div>
            <div className="hidden lg:block w-full h-60 p-5 animate-pulse bg-zinc-300 border-b rounded-md"></div>
            <div className="hidden xl:block w-full h-60 p-5 animate-pulse bg-zinc-300 border-b rounded-md"></div>
            <div className="hidden xl:block w-full h-60 p-5 animate-pulse bg-zinc-300 border-b rounded-md"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-3">
            <div className="flex flex-col items-end gap-2">
              <div className="w-full h-8 animate-pulse bg-zinc-300 border-b rounded-md"></div>
              <div className="w-1/3 h-6 animate-pulse bg-zinc-300 border-b rounded-md text-transparent">
                xxxxx
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end gap-2">
              <div className="w-full h-8 animate-pulse bg-zinc-300 border-b rounded-md"></div>
              <div className="w-1/3 h-6 animate-pulse bg-zinc-300 border-b rounded-md text-transparent">
                xxxxx
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-end gap-2">
              <div className="w-full h-8 animate-pulse bg-zinc-300 border-b rounded-md"></div>
              <div className="w-1/3 h-6 animate-pulse bg-zinc-300 border-b rounded-md text-transparent">
                xxxxx
              </div>
            </div>
            <div className="hidden xl:flex flex-col items-end gap-2">
              <div className="w-full h-8 animate-pulse bg-zinc-300 border-b rounded-md"></div>
              <div className="w-1/3 h-6 animate-pulse bg-zinc-300 border-b rounded-md text-transparent">
                xxxxx
              </div>
            </div>
            <div className="hidden xl:flex flex-col items-end gap-2">
              <div className="w-full h-8 animate-pulse bg-zinc-300 border-b rounded-md"></div>
              <div className="w-1/3 h-6 animate-pulse bg-zinc-300 border-b rounded-md text-transparent">
                xxxxx
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
