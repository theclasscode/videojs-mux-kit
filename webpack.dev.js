const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globby = require('globby');
const path = require('path');

const common = require('./webpack.common');

const buildHtmlWebpackConfigs = async function () {
  const demoFiles = await globby(['src/demo/**.html']);

  return demoFiles.map((demoFile) => {
    const demoFileBase = path.parse(demoFile);
    return new HtmlWebpackPlugin({
      template: demoFile,
      inject: true,
      chunks: ['index'],
      filename: `${demoFileBase.name}.html`,
    });
  });
};

module.exports = async function (env) {
  return merge(common(env), {
    entry: {
      index: [
        './src/entry.js',
        './src/demo/preview.js',
        './src/demo/preview.scss',
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    watch: true,
    module: {
      rules: [
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader?url=false', 'sass-loader'],
        },
      ],
    },
    plugins: [...(await buildHtmlWebpackConfigs())],
  });
};
