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
        protocol: "https",
        hostname: "lzhxfeoqsblgzjlpazvd.supabase.co", // -- project supabase storage
        port: "",
        pathname: "/storage/v1/object/sign/avatars/**", // -- storage path for avatars
      },
      {
        protocol: "http",
        hostname: "localhost", // -- local server
        port: "5000",
        pathname: "/avatars/**", 
      },
    ],
  },
};

export default nextConfig;
