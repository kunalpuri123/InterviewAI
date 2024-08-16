// next.config.mjs

export default {
    reactStrictMode: false,
    webpack(config) {
      // Set fallback for `fs` module to prevent errors
      config.resolve.fallback = { fs: false };
  
      return config;
    },
  };
  