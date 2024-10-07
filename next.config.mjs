/** @type {import('next').NextConfig} */
const nextConfig = {
  // -- To use a remote image with Next <Image /> need to define remote storage in config --
  swcMinify: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "app",
        port: "5000",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "erudyt.net",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
