import fs from "fs";
import path from "path";

/** @type {import('next').NextConfig} */
const baseConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

function loadUserConfig() {
  const userConfigPath = path.resolve("./v0-user-next.config.js");
  if (fs.existsSync(userConfigPath)) {
    // Dynamic require instead of await import
    const mod = require(userConfigPath);
    return mod.default || mod;
  }
  return {};
}

function mergeConfig(base, user) {
  for (const key in user) {
    if (typeof base[key] === "object" && !Array.isArray(base[key])) {
      base[key] = { ...base[key], ...user[key] };
    } else {
      base[key] = user[key];
    }
  }
}

const userConfig = loadUserConfig();
mergeConfig(baseConfig, userConfig);

export default baseConfig;
