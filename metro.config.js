const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
module.exports = (async (env) => {
  const defaultConfig = getDefaultConfig(__dirname);
  const { transformer, resolver } = defaultConfig;
  config = {
    ...defaultConfig,
    transformer: {
      ...defaultConfig.transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      ...defaultConfig.resolver,
      assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
    },
  };
  return withNativeWind(config, { input: './global.css' });
})();



