var path = require('path');

module.exports = {
  stories: ['../resources/js/frontend/components/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-knobs/register', '@storybook/addon-links'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    });
    config.resolve.modules.push(
      path.resolve(__dirname, '../resources/js/frontend/components')
    )

    // Return the altered config
    return config;
  },
};
