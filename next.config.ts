import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Enable source maps in dev to point to original .module.scss in DevTools */
  // webpack: (config, { dev }) => {
  //   if (dev) {
  //     config.devtool = 'source-map';
  //   }
  //   return config;
  // },
  /* Enable source maps in production builds */
  // productionBrowserSourceMaps: true,
};

export default nextConfig;
