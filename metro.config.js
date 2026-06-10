const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add support for serving public folder files
config.projectRoot = __dirname;
config.watchFolders = [__dirname];

// For web platform, use the enhanced configuration
if (process.env.EXPO_OS === 'web') {
  // Enhanced resolver configuration for web
  config.resolver.extraNodeModules = new Proxy(
    {},
    {
      get: (target, name) => {
        if (name === 'public') {
          return path.join(__dirname, 'public');
        }
        return path.join(__dirname, `node_modules/${name}`);
      },
    }
  );
}

module.exports = config;
