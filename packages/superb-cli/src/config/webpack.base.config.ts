import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { createPostcssOptions } from './postcss.config'
import { isDev } from '../shared/env'
import { EXTENSIONS, POSTCSS_CONFIG, TS_CONFIG } from '../shared/constant'
import { WebpackPluginInstance } from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { pathExistsSync } from 'fs-extra'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { accessProperty } from '../shared/fsUtils'
import { getSuperbConfig } from './superb-config'

export type URLLoaderType = 'image' | 'video' | 'audio' | 'font'

export function createCSSLoaders() {
  return [
    isDev() ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: createPostcssOptions(POSTCSS_CONFIG),
    },
  ]
}
export function createURLLoaderOptions(type: URLLoaderType) {
  return {
    name: '[name].[hash:7].[ext]',
    limit: 8 * 1024,
    outputPath: `${type}s/`,
    esModule: false,
  }
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

export const commonTemplateOption = {
  minify: {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
  },
  hash: true,
}

export function createBasePlugins(): WebpackPluginInstance[] {
  const superbConfig = getSuperbConfig()
  const plugins: WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../site/pc/index.html'),
      filename: 'index.html',
      chunks: ['pc'],
      title: accessProperty(superbConfig, 'pc.title'),
      logo: accessProperty(superbConfig, 'pc.logo'),
      description: accessProperty(superbConfig, 'pc.description'),
      ...commonTemplateOption,
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../../site/mobile/mobile.html'),
    //   filename: 'mobile.html',
    //   chunks: ['mobile'],
    //   title: accessProperty(superbConfig, 'mobile.title'),
    //   logo: accessProperty(superbConfig, 'mobile.logo'),
    //   description: accessProperty(superbConfig, 'mobile.description'),
    //   ...commonTemplateOption
    // })
  ]

  pathExistsSync(TS_CONFIG) && plugins.push(new ForkTsCheckerWebpackPlugin())

  return plugins
}

export function createBaseConfig() {
  return {
    entry: {
      pc: path.resolve(__dirname, '../../site/pc/index.tsx'),
      // mobile: path.resolve(__dirname, '../../site/mobile/main.ts')
    },
    resolve: {
      extensions: EXTENSIONS,
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
          use: [createBabelConfig(), require.resolve('../../../superb-markdown-loader/index.js')],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          // options: createURLLoaderOptions('image')
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          // options: createURLLoaderOptions('font')
        },
        {
          test: /\.css$/i,
          use: createCSSLoaders(),
        },
        {
          test: /\.less/i,
          use: [...createCSSLoaders(), 'less-loader'],
        },
        {
          test: /\.s[ac]ss/i,
          use: [...createCSSLoaders(), 'sass-loader'],
        },
      ],
    },
  }
}
