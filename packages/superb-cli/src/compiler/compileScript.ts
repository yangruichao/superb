import { BabelFileResult, transformAsync } from '@babel/core'
import { writeFileSync, readFileSync, removeSync } from 'fs-extra'
import { bigCamelize, replaceExt } from '../shared/fsUtils'
import { resolve } from 'path'
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

export function compileLibraryEntry(
  dir: string,
  componentNames: string[],
  modules: string | boolean = false
) {
  const imports = componentNames
    .map(
      (componentName: string) => `import ${bigCamelize(componentName)} from './${componentName}'`
    )
    .join('\n')
  const cssImports = componentNames
    .map((componentName: string) => `import './${componentName}/index.css'`)
    .join('\n')
  const requires = componentNames
    .map(
      (componentName: string) => `var ${bigCamelize(componentName)} = require('./${componentName}')`
    )
    .join('\n')
  const cssRequires = componentNames
    .map((componentName: string) => `require('./${componentName}/index.css')`)
    .join('\n')

  const esExports = `\
export {
  ${componentNames.map((componentName: string) => `${bigCamelize(componentName)}`).join(',\n  ')}
}
export default {
  ${componentNames.map((componentName: string) => `${bigCamelize(componentName)}`).join(',\n  ')},
}\
`
  const cjsExports = `\
module.exports = {
  ${componentNames.map((componentName: string) => `${bigCamelize(componentName)}`).join(',\n  ')}
}\
`

  const template = `\
${modules === 'cjs' ? requires : imports}\n
${modules === 'cjs' ? cssRequires : cssImports}\n
${modules === 'cjs' ? cjsExports : esExports}
`
  writeFileSync(resolve(dir, 'index.js'), template, 'utf-8')
}
