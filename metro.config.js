// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  const { resolver } = config;

  // ✅ Add support for Firebase's .cjs modules
  resolver.sourceExts.push('cjs');

  // ✅ Disable package.json exports resolution that breaks Firebase Auth
  resolver.unstable_enablePackageExports = false;

  return config;
})();
