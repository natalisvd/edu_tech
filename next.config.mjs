/** @type {import('next').NextConfig} */
const nextConfig = {
  // -- To use a remote image with Next <Image /> need to define remote storage in config --
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.daisyui.com", // -- change the hostname to db storage source
        port: "",
        pathname: "/images/**", // -- edit storage path if it needed
      },
      {
        protocol: "http",
        hostname: "localhost", 
        port: "5000",
        pathname: "/images/**", 
      },
    ],
  },
};

export default nextConfig;
