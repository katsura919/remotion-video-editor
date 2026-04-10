/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig((currentConfig) => {
  return {
    ...currentConfig,
    devtool: false,
    optimization: {
      minimize: false,
    },
    output: {
      ...(currentConfig.output ?? {}),
      hashFunction: 'md5',
    },
    cache: false,
  };
});
