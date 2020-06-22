const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const production = (process.env.NODE_ENV === 'production');

// FIXME: Enable source map for sass. The problem right now is it will not work if "devtool" is "eval".
// But if we use the other values the source map for SFC will not work.
module.exports = {
  mode: production ? 'production' : 'development',
  entry: path.resolve(__dirname, 'index.ts'),
  output: {
    filename: path.join('js', '[contenthash].js'),
    chunkFilename: path.join('js', '[contenthash].js')
  },
  resolve: {
    alias: {
      '@': [__dirname, path.resolve(__dirname, '..', 'commons')],
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: ['.wasm', '.mjs', '.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: path.join('css', '[contenthash].css'),
      chunkFilename: path.join('css', '[contenthash].css')
    }),
    new VueLoaderPlugin()
  ],
  optimization: {
    minimize: production,
    minimizer: production ? [new TerserPlugin(), new OptimizeCSSAssetsPlugin()] : [],
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devtool: production ? false : 'eval-source-map'
};
