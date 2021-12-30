import { resolve } from 'path'

export const CWD = process.cwd()
export const POSTCSS_CONFIG = resolve(CWD, 'postcss.config.js')
export const TS_CONFIG = resolve(CWD, 'tsconfig.json')
export const SUPERB_CONFIG = resolve(CWD, 'superb.config.js')
export const SRC_DIR = resolve(CWD, 'src')
export const ES_DIR = resolve(CWD, 'es')
export const CJS_DIR = resolve(CWD, 'cjs')
export const UMD_DIR = resolve(CWD, 'umd')
export const EXAMPLE_DIR_NAME = 'example'
export const TESTS_DIR_NAME = '__tests__'
export const EXTENSIONS = ['.ts', '.tsx', '.jsx', '.js', '.scss', '.less', '.css']

// site
export const SITE_PC_ROUTES = resolve(__dirname, '../../site/router/config.ts')
export const SITE_MOBILE_ROUTES = resolve(__dirname, '../../site/routes.ts')
export const OUTPUT_SITE_PATH = resolve(CWD, 'site')

// doc
export const DOCS_DIR_NAME = 'example'
export const ROOT_DOCS_DIR = resolve(CWD, 'example')
