module.exports = {
  rollup(config, options) {
    config.output.file = config.output.file.replace(
      'dist',
      'example/src/ra-data-appsync'
    );

    return config;
  },
};
