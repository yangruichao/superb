import merge from 'webpack-merge'
import { resolve } from 'path'
import { BASE_CONFIG } from './webpack.base.config'
import { ES_DIR, UMD_DIR } from '../shared/constant'
import { getSuperbConfig } from './superb-config'
import { accessProperty, bigCamelize } from '../shared/fsUtils'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function getUmdConfig() {
  const superbConfig = getSuperbConfig()
  const namespace = accessProperty(superbConfig, 'namespace')
  return merge(BASE_CONFIG as any, {
    mode: 'production',
    entry: resolve(ES_DIR, 'umdIndex.js'),
    output: {
      path: UMD_DIR,
      filename: `${namespace}.js`,
      library: `${bigCamelize(namespace)}`,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    externals: {
      react: 'react',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${namespace}.css`,
      }),
    ],
  })
}
