import merge from 'webpack-merge'
import WebpackBarPlugin from 'webpackbar'
import { createBaseConfig } from './webpack.base.config'

export function getDevConfig() {
  return merge(createBaseConfig() as any, {
    mode: 'development',
    devtool: 'source-map',
    output: {
      chunkFilename: 'js/[name].[chunkhash:8].js',
      publicPath: '/',
    },
    devServer: {
      port: 8080,
      host: 'localhost',
      client: {
        overlay: {
          errors: true, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
          warnings: false, // 只显示错误信息
        },
        progress: true,
      },
      hot: true,
      historyApiFallback: true,
    },
    plugins: [
      new WebpackBarPlugin({
        name: 'Superb development building',
        color: '#15DD6A',
      }),
    ],
  })
}
