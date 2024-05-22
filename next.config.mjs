/** @type {import('next').NextConfig} */
const nextConfig = {
  // -- To use a remote image with Next <Image /> need to define remote storage in config --
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.daisyui.com', // -- change the hostname to db storage source
        port: '',
        pathname: '/images/**', // -- edit storage path if it needed
      },
    ],
  },
};

export default nextConfig;
