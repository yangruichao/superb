import { readFileSync, removeSync, writeFileSync } from 'fs-extra'
import { render } from 'less'
import { replaceExt } from '../shared/fsUtils'
import logger from '../shared/logger'

export const EMPTY_SPACE_RE = /[\s]+/g
export const EMPTY_LINE_RE = /[\n\r]*/g

export function clearEmptyLine(style: string) {
  return style.replace(EMPTY_LINE_RE, '').replace(EMPTY_SPACE_RE, ' ')
}

export async function compileLess(path: string) {
  try {
    const source = readFileSync(path, 'utf-8')
    const { css } = await render(source, { filename: path })
    writeFileSync(replaceExt(path, '.css'), clearEmptyLine(css), 'utf-8')
    removeSync(path)
  } catch (e: any) {
    logger.error(e.toString())
  }
}
