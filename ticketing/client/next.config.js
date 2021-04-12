module.exports = {
  webpackDevMiddleware: (config) => {
    // poll all the files in the directories automatically every 300 ms
    config.watchOptions.poll = 300;
    return config;
  },
};
