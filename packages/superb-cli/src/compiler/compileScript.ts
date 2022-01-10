import { BabelFileResult, transformAsync } from '@babel/core'
import { writeFileSync, readFileSync, removeSync, writeFile } from 'fs-extra'
import { bigCamelize, replaceExt } from '../shared/fsUtils'
import { resolve } from 'path'
import logger from '../shared/logger'

export async function compileScript(script: string, path: string) {
  try {
    const modules = process.env.BABEL_MODULE === 'commonjs' ? 'commonjs' : false
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

export async function compileScriptFile(path: string) {
  const sources = readFileSync(path, 'utf-8')
  await compileScript(sources, path)
}
export async function compileESEntry(dir: string, publicDirs: string[]) {
  const imports: string[] = []
  const lessImports: string[] = []
  const publicComponents: string[] = []

  publicDirs.forEach((dirname: string) => {
    const publicComponent = bigCamelize(dirname)

    publicComponents.push(publicComponent)
    imports.push(`import ${publicComponent}, * as ${publicComponent}Module from './${dirname}'`)

    lessImports.push(`import './${dirname}/style'`)
  })

  const umdTemplate = `\
${imports.join('\n')}\n
${lessImports.join('\n')}\n
export {
  ${publicComponents.join(',\n  ')}
}

export default {
  ${publicComponents.join(',\n  ')}
}
`

  const lessTemplate = `\
${lessImports.join('\n')}
`
  await Promise.all([
    writeFile(resolve(dir, 'umdIndex.js'), umdTemplate, 'utf-8'),
    writeFile(resolve(dir, 'less.js'), lessTemplate, 'utf-8'),
  ])
}

export function compileCommonJSEntry(dir: string, publicDirs: string[]) {
  const requires: string[] = []
  const lessRequires: string[] = []
  const publicComponents: string[] = []

  publicDirs.forEach((dirname: string) => {
    const publicComponent = bigCamelize(dirname)

    publicComponents.push(publicComponent)
    requires.push(`var ${publicComponent} = require('./${dirname}')['default']`)
    lessRequires.push(`require('./${dirname}/style')`)
  })

  const lessTemplate = `\
${lessRequires.join('\n')}
`
  writeFile(resolve(dir, 'less.js'), lessTemplate, 'utf-8')
}
