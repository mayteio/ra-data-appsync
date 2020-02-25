module.exports = {
  rollup(config, options) {
    const originalOutput = config.output;
    config.output = [
      originalOutput,
      {
        ...originalOutput,
        file: originalOutput.file.replace(
          'dist',
          'example/src/ra-data-appsync'
        ),
      },
    ];

    return config;
  },
};
