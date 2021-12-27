import { copy, readdir } from 'fs-extra'
import { CJS_DIR, SRC_DIR } from '../shared/constant'
import { resolve } from 'path'
import { getDirComponentNames, isDir } from '../shared/fsUtils'
import { compileComponent } from './compileComponent'
import logger from '../shared/logger'
import { compileLibraryEntry } from './compileScript'

export async function compileCJSDir(cjsDir: string[], dirPath: string) {
  await Promise.all(
    cjsDir.map((filename: string) => {
      const path: string = resolve(dirPath, filename)
      return isDir(path) ? compileComponent(path) : null
    })
  )
  compileLibraryEntry(dirPath, getDirComponentNames(cjsDir), 'cjs')
}

export async function compileCJS() {
  try {
    await copy(SRC_DIR, CJS_DIR)
    const esDir: string[] = await readdir(CJS_DIR)
    await compileCJSDir(esDir, CJS_DIR)
  } catch (e: any) {
    logger.error(e.toString())
  }
}
