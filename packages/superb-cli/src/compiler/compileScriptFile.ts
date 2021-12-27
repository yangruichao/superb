import { BabelFileResult, transformAsync } from '@babel/core'
import { writeFileSync, readFileSync, removeSync } from 'fs-extra'
import { replaceExt } from '../shared/fsUtils'
import logger from '../shared/logger'

export async function compileScript(
  script: string,
  path: string,
  modules: string | boolean = false
) {
  try {
    const { code } = (await transformAsync(script, {
      filename: replaceExt(path, '.ts'),
      presets: [
        [
          require('@babel/preset-env'),
          {
            loose: true,
            modules,
          },
        ],
        require('@babel/preset-react'),
        [
          require('@babel/preset-typescript'),
          {
            isTSX: true,
            allExtensions: true,
          },
        ],
      ],
      plugins: [require('@babel/plugin-transform-runtime')],
    })) as BabelFileResult
    removeSync(path)
    code && writeFileSync(replaceExt(path, '.js'), code, 'utf8')
  } catch (e: any) {
    logger.error(e.toString())
  }
}

export async function compileScriptFile(path: string, modules: string | boolean = false) {
  const sources = readFileSync(path, 'utf-8')
  await compileScript(sources, path, modules)
}
