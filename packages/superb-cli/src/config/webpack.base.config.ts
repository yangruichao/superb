import path from 'path'
import { createPostcssOptions } from './postcss.config'
import { isDev } from '../shared/env'
import { EXTENSIONS, POSTCSS_CONFIG, SITE_CONFIG, TS_CONFIG } from '../shared/constant'
import { WebpackPluginInstance } from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { pathExistsSync } from 'fs-extra'

export type URLLoaderType = 'image' | 'video' | 'audio' | 'font'

export function CSS_LOADERS() {
  console.log(isDev(), 'webpack')

  return [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: createPostcssOptions(POSTCSS_CONFIG),
    },
  ]
}
export function createBabelConfig() {
  return {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime'],
      targets: {
        ie: '11',
      },
    },
  }
}

export function createBasePlugins(): WebpackPluginInstance[] {
  const plugins: WebpackPluginInstance[] = []
  pathExistsSync(TS_CONFIG) && plugins.push(new ForkTsCheckerWebpackPlugin())
  return plugins
}

export const BASE_CONFIG = {
  entry: {
    docs: path.resolve(__dirname, '../../site/index.tsx'),
  },
  resolve: {
    extensions: EXTENSIONS,
    alias: {
      '@config': SITE_CONFIG,
    },
  },
  plugins: createBasePlugins(),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['cache-loader', createBabelConfig()],
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          'cache-loader',
          createBabelConfig(),
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.md$/,
        use: [require.resolve('../../../superb-markdown-loader/index.js')],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: CSS_LOADERS(),
      },
      {
        test: /\.less/i,
        use: [...CSS_LOADERS(), 'less-loader'],
      },
      {
        test: /\.s[ac]ss/i,
        use: [...CSS_LOADERS(), 'sass-loader'],
      },
    ],
  },
}
