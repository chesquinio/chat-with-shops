export const BetterProductSkeleton = () => {
  return (
    <main>
      <div className="flex justify-center items-center bg-gray-100 px-10 py-4 rounded-lg mt-10 mb-6">
        <div>
          <div className="text-transparent w-32 h-8 animate-pulse bg-zinc-500 border-b rounded-md mb-2">
            xxxxx
          </div>
          <div className="text-transparent w-[20rem] sm:w-[30rem] lg:w-[48rem] h-6 animate-pulse bg-zinc-500 border-b rounded-md">
            xxxxxxx
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 min-[1500px]:grid-cols-4 gap-5 mb-4">
        <div>
          <div className="flex justify-center">
            <div className="w-32 h-8 animate-pulse bg-zinc-500 border-b rounded-md text-transparent mb-4">
              xxxxx
            </div>
          </div>
          <div className="w-full h-60 p-5 animate-pulse bg-zinc-300 border-b rounded-md mb-6"></div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-full h-8 animate-pulse bg-zinc-300 border-b rounded-md"></div>
            <div className="w-1/3 h-6 animate-pulse bg-zinc-300 border-b rounded-md text-transparent">
              xxxxx
            </div>
          </div>
        </div>
        <div className="hidden sm:block w-full">
          <div className="flex justify-center">
            <div className="w-32 h-8 animate-pulse bg-zinc-500 border-b rounded-md text-transparent mb-4">
              xxxxx
            </div>
          </div>
          <div className="w-full h-60 p-5 animate-pulse bg-zinc-300 border-b rounded-md mb-6"></div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-full h-8 animate-pulse bg-zinc-300 border-b rounded-md"></div>
            <div className="w-1/3 h-6 animate-pulse bg-zinc-300 border-b rounded-md text-transparent">
              xxxxx
            </div>
          </div>
        </div>
        <div className="hidden min-[1500px]:block w-full">
          <div className="flex justify-center">
            <div className="w-32 h-8 animate-pulse bg-zinc-500 border-b rounded-md text-transparent mb-4">
              xxxxx
            </div>
          </div>
          <div className="w-full h-60 p-5 animate-pulse bg-zinc-300 border-b rounded-md mb-6"></div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-full h-8 animate-pulse bg-zinc-300 border-b rounded-md"></div>
            <div className="w-1/3 h-6 animate-pulse bg-zinc-300 border-b rounded-md text-transparent">
              xxxxx
            </div>
          </div>
        </div>
        <div className="hidden min-[1500px]:block w-full">
          <div className="flex justify-center">
            <div className="w-32 h-8 animate-pulse bg-zinc-500 border-b rounded-md text-transparent mb-4">
              xxxxx
            </div>
          </div>
          <div className="w-full h-60 p-5 animate-pulse bg-zinc-300 border-b rounded-md mb-6"></div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-full h-8 animate-pulse bg-zinc-300 border-b rounded-md"></div>
            <div className="w-1/3 h-6 animate-pulse bg-zinc-300 border-b rounded-md text-transparent">
              xxxxx
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
