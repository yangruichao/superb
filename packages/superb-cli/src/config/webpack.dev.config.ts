import merge from 'webpack-merge'
import WebpackBarPlugin from 'webpackbar'
import { BASE_CONFIG } from './webpack.base.config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import { accessProperty } from '../shared/fsUtils'
import { getSuperbConfig } from './superb-config'
import { isDev } from '../shared/env'

const superbConfig = getSuperbConfig()

export const HTML_WEBPACK_PLUGINS = [
  new HtmlWebpackPlugin({
    template: resolve(__dirname, '../../site/index.html'),
    filename: 'index.html',
    chunks: ['docs'],
    title: accessProperty(superbConfig, 'docs.title'),
    logo: accessProperty(superbConfig, 'docs.logo'),
    description: accessProperty(superbConfig, 'docs.description'),
    minify: {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
    },
    hash: true,
  }),
]

export function getDevConfig() {
  console.log(isDev(), 'webpackDev')

  return merge(BASE_CONFIG as any, {
    mode: 'development',
    devtool: 'source-map',
    output: {
      chunkFilename: 'js/[name].[chunkhash:8].js',
      publicPath: '/',
    },
    devServer: {
      port: accessProperty(superbConfig, 'port'),
      host: accessProperty(superbConfig, 'host'),
      client: {
        overlay: {
          errors: true, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
          warnings: false, // 只显示错误信息
        },
        progress: true,
      },
      hot: true,
      historyApiFallback: true, // history mode
    },
    plugins: [
      new WebpackBarPlugin({
        name: 'Superb development building',
        color: '#15DD6A',
      }),
      ...HTML_WEBPACK_PLUGINS,
    ],
  })
}
