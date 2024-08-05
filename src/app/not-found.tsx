import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid h-dvh place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-500">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          No pudimos encontrar la página que estás buscando.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md text-indigo-600 px-3.5 py-2.5 text-sm font-semibold hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span aria-hidden="true" className="mr-2">
              {" "}
              &larr;
            </span>
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
