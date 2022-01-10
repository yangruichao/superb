import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import merge from 'webpack-merge'
import WebpackBarPlugin from 'webpackbar'
import { SITE_OUTPUT_PATH, SITE_PUBLIC_PATH } from '../shared/constant'
import { BASE_CONFIG } from './webpack.base.config'

export function getBuildConfig() {
  return merge(BASE_CONFIG as any, {
    mode: 'production',
    output: {
      publicPath: './',
      path: SITE_PUBLIC_PATH,
      filename: 'js/[name].[fullhash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js',
    },
    plugins: [
      new WebpackBarPlugin({
        name: 'Superb production building',
        color: '#15DD6A',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[fullhash:8].css',
        chunkFilename: 'css/[id].[chunkhash:8].css',
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [{ from: SITE_PUBLIC_PATH, to: SITE_OUTPUT_PATH }],
      }),
    ],
  })
}
