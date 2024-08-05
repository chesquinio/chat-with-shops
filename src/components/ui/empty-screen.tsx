export function EmptyScreen() {
  const newLocal =
    "flex flex-col gap-1 sm:gap-2 rounded-lg border bg-background p-6 sm:p-8";
  return (
    <div className="mx-auto max-w-2xl px-2 sm:px-4 absolute bottom-4 sm:bottom-10 translate-x-1/2 right-1/2 w-full">
      <div className={newLocal}>
        <h1 className="text-lg font-semibold">
          Bienvenido al Asistente de Compras!
        </h1>
        <p className="leading-normal text-muted-foreground">
          Esta aplicación te permitirá <b>buscar productos</b> de las mayores
          tiendas y supermercados locales, comparar precios y simular un carrito
          de compras.
        </p>
        <p className="leading-normal text-muted-foreground">
          Por el momento, solo utilizamos 4 tiendas ubicadas en la localidad de{" "}
          <a
            target="_blanck"
            className="font-bold"
            href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54572.342808359484!2d-61.52898255038729!3d-31.25475035460281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95caae460db27c0f%3A0x8be1b926d473c17b!2sRafaela%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1722537658807!5m2!1ses!2sar"
          >
            Rafaela, Santa Fe, Argentina.
          </a>{" "}
          Estaremos trabajando para extendernos a mas localidades del país.
        </p>
        <p className="leading-normal text-muted-foreground">
          Las tiendas son: <b>Libertad</b>, <b>Pingüino</b>, <b>La Anónima</b> y{" "}
          <b>Flaming</b>
        </p>
      </div>
    </div>
  );
}
