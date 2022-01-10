import { copy, ensureFileSync, readdir, removeSync } from 'fs-extra'
import webpack from 'webpack'
import { getUmdConfig } from '../config/webpack.umd.config'
import {
  CJS_DIR,
  DOCS_DIR_NAME,
  ES_DIR,
  EXAMPLE_DIR_NAME,
  SRC_DIR,
  STYLE_DIR_NAME,
  TESTS_DIR_NAME,
} from '../shared/constant'
import logger from '../shared/logger'
import { resolve } from 'path'
import { getPublicDirs, isDir, isLess, isScript } from '../shared/fsUtils'
import { compileCommonJSEntry, compileESEntry, compileScriptFile } from './compileScript'
import { compileLess } from './compileStyle'

export function compileUMD() {
  return new Promise<void>((resolve, reject) => {
    const config = getUmdConfig()

    webpack(config, (err, stats: any) => {
      if (err) {
        logger.error(err.toString())
        reject()
      }
      if (stats?.hasErrors()) {
        logger.error(stats)
        reject()
      }
      if (!err && !stats?.hasErrors()) {
        resolve()
      }
    })
  })
}
export async function compileDir(dir: string) {
  const dirs = await readdir(dir)

  await Promise.all(
    dirs.map((filename) => {
      const file = resolve(dir, filename)

      ;[TESTS_DIR_NAME, EXAMPLE_DIR_NAME, DOCS_DIR_NAME].includes(filename) && removeSync(file)

      // if (filename === STYLE_DIR_NAME) {
      //   return Promise.resolve()
      // }

      return compileFile(file)
    })
  )
}

export async function compileFile(file: string) {
  isScript(file) && (await compileScriptFile(file))
  isLess(file) && (await compileLess(file))
  isDir(file) && (await compileDir(file))
}

export async function compileModule(modules: 'umd' | 'commonjs' | boolean = false) {
  if (modules === 'umd') {
    await compileUMD()
    return
  }
  process.env.BABEL_MODULE = modules === 'commonjs' ? 'commonjs' : 'module'

  const dest = modules === 'commonjs' ? CJS_DIR : ES_DIR
  await copy(SRC_DIR, dest)
  const moduleDir: string[] = await readdir(dest)

  await Promise.all(
    moduleDir.map((filename: string) => {
      const file: string = resolve(dest, filename)

      isScript(file) && compileScriptFile(file)

      return isDir(file) ? compileDir(file) : null
    })
  )
  const publicDirs = await getPublicDirs()
  modules === 'commonjs' ? compileCommonJSEntry(dest, publicDirs) : compileESEntry(dest, publicDirs)
}
