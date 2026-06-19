const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Garante que o Metro consiga ler arquivos binários .wasm (WebAssembly)
  config.resolver.assetExts.push('wasm');

  return config;
})();