const path = require('path')
const toPath = (_path) => path.join(process.cwd(), _path)
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
module.exports = {
  refs: {
    '@chakra-ui/react': {
      disable: true,
    },
  },
  stories: [
    '../src/__stories__/**/*.@(stories|story).@(js|jsx|ts|tsx)',
    '../src/views/**/*.@(stories|story).@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        },
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
        },
        forkTsCheckerWebpackPluginOptions: {
          colors: false, // disables built-in colors in logger messages
        },
        include: [path.resolve(__dirname, '../src')],
      },
    },
  ],
  typescript: {
    check: false,
    checkOptions: {},
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ]
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    }
  },
  docs: {
    autodocs: false,
  },
}
