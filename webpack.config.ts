import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/App.fsproj',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './public',
    port: Number(process.env.PORT ?? '8080'),
  },
  module: {
    rules: [
      {
        test: /.fs(proj)?$/,
        exclude: '/node_modules/',
        use: {
          loader: 'fable-loader',
          options: {
            babel: {
              presets: [
                [ '@babel/preset-env', { modules: false } ],
              ],
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
  ],
};

export default config;
