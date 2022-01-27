/* eslint-env node */
import { resolve } from "path";
import bundleAnalyzer from "@next/bundle-analyzer";
import mdxSiteOptions from "./.build/server/mdx-config-site.mjs";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const PAGES_DIRECTORY = resolve("pages");
const CONTENT_DIRECTORY = resolve("content");

export default withBundleAnalyzer({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  outputFileTracing: false,
  images: {
    path: "/_next/image",
    disableStaticImages: true,
    domains: ["i.ytimg.com"],
  },
  experimental: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  trailingSlash: true,
  webpack: (config, options) => {
    config.output.assetModuleFilename = "static/media/[hash][ext]";

    config.module.rules.push({
      test: /\.(png|jpg|webp|gif|mp4|webm|ogg|swf|ogv|woff2)$/i,
      type: "asset/resource",
    });

    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          issuer: /\.[mjt]sx?$/,
          resourceQuery: /react/,
          use: "@svgr/webpack",
        },
        {
          type: "asset/resource",
        },
      ],
    });

    config.module.rules.push({
      test: /\.(md|mdx)$/,
      include: PAGES_DIRECTORY,
      exclude: CONTENT_DIRECTORY,
      use: [
        options.defaultLoaders.babel, //TODO: need check
        {
          loader: "@mdx-js/loader",
          options: mdxSiteOptions,
        },
      ],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: "json",
      use: "yaml-loader",
    });

    return config;
  },
});
