import { remove } from 'fs-extra'
import ora from 'ora'
import { CJS_DIR, ES_DIR, UMD_DIR } from '../shared/constant'
import logger from '../shared/logger'
import { compileModule } from '../compiler/compileModule'

export function removeDir() {
  return Promise.all([remove(ES_DIR), remove(CJS_DIR), remove(UMD_DIR)])
}
export async function compile() {
  const s = ora('Compile start for ES & CJS & UMD \n').start()
  try {
    await removeDir()
    await compileModule()
    await compileModule('commonjs')
    await compileModule('umd')
    s.succeed('✨ Compile success!')
  } catch (err: any) {
    logger.error(err.toString())
    s.fail('Compile fail!')
  }
}
