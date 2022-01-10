import { readFileSync, writeFileSync } from 'fs-extra'
import { render } from 'less'
import { replaceExt } from '../shared/fsUtils'
import logger from '../shared/logger'

export const IMPORT_CSS_RE = /(?<!['"`])import\s+['"](\.{1,2}\/.+\.css)['"]\s*;?(?!\s*['"`])/g
export const IMPORT_LESS_RE = /(?<!['"`])import\s+['"](\.{1,2}\/.+\.less)['"]\s*;?(?!\s*['"`])/g
export const REQUIRE_CSS_RE = /(?<!['"`])require\(\s*['"](\.{1,2}\/.+\.css)['"]\s*\);?(?!\s*['"`])/g
export const REQUIRE_LESS_RE =
  /(?<!['"`])require\(\s*['"](\.{1,2}\/.+\.less)['"]\s*\);?(?!\s*['"`])/g
export const EMPTY_SPACE_RE = /[\s]+/g
export const EMPTY_LINE_RE = /[\n\r]*/g

export function clearEmptyLine(style: string) {
  return style.replace(EMPTY_LINE_RE, '').replace(EMPTY_SPACE_RE, ' ')
}
export async function compileLess(file: string) {
  try {
    const source = readFileSync(file, 'utf-8')
    const { css } = await render(source, { filename: file })
    writeFileSync(replaceExt(file, '.css'), clearEmptyLine(css), 'utf-8')
  } catch (e: any) {
    logger.error(e.toString())
  }
}
