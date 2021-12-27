import merge from 'webpack-merge'
import { resolve } from 'path'
import { createBaseConfig } from './webpack.base.config'
import { ES_DIR, UMD_DIR } from '../shared/constant'
import { getSuperbConfig } from './superb-config'
import { accessProperty, bigCamelize } from '../shared/fsUtils'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function getUmdConfig() {
  const superbConfig = getSuperbConfig()
  const namespace = accessProperty(superbConfig, 'namespace')
  return merge(createBaseConfig() as any, {
    mode: 'production',
    entry: resolve(ES_DIR, 'index.js'),
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
