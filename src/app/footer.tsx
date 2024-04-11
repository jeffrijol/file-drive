import Link from "next/link";

export function Footer() {
  return (
    <div className="h-40 bg-gray-100 mt-12 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div></div>

        <Link className="text-blue-900 hover:text-blue-500" href="/privacy">
          Nuestra sociedad
        </Link>
        <Link
          className="text-blue-900 hover:text-blue-500"
          href="/terms-of-service"
        >
          Política de privacidad
        </Link>
        <Link className="text-blue-900 hover:text-blue-500" href="/about">
          Sobro nosotros
        </Link>
      </div>
    </div>
  );
}
