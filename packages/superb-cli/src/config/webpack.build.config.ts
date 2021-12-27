import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import merge from 'webpack-merge'
import WebpackBarPlugin from 'webpackbar'
import { OUTPUT_SITE_PATH } from '../shared/constant'
import { createBaseConfig } from './webpack.base.config'

export function getBuildConfig() {
  return merge(createBaseConfig() as any, {
    mode: 'production',
    output: {
      publicPath: './',
      path: OUTPUT_SITE_PATH,
      filename: '[name].[hash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js',
    },
    plugins: [
      new WebpackBarPlugin({
        name: 'Superb production building',
        color: '#15DD6A',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:8].css',
        chunkFilename: 'css/[id].[chunkhash:8].css',
      }),
      new CleanWebpackPlugin(),
    ],
  })
}
