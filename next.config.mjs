/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO verificar si se necesita el uso de la propiedad experimental
  // Configuración básica para Supabase:
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig