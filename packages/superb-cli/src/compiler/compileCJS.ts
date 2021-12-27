import { copy, readdir } from 'fs-extra'
import { CJS_DIR, SRC_DIR } from '../shared/constant'
import logger from '../shared/logger'
import { resolve } from 'path'
import { isDir } from '../shared/fsUtils'
import { compileComponent } from './compileComponent'

export async function compileCJSDir(cjsDir: string[], dirPath: string) {
  cjsDir.forEach((filename: string) => {
    const path: string = resolve(dirPath, filename)
    isDir(path) && compileComponent(path, 'cjs')
  })
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
