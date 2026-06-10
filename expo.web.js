const path = require('path');

module.exports = async function (env, argv) {
  const config = await require('expo/webpack.config')(env, argv);

  // Add static folder for videos
  config.devServer = config.devServer || {};
  config.devServer.static = {
    directory: path.join(__dirname, 'public'),
    publicPath: '/',
  };

  return config;
};
