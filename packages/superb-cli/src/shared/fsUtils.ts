import { lstatSync, pathExistsSync } from 'fs-extra'
import { extname, parse } from 'path'
import { EXAMPLE_DIR_NAME, TESTS_DIR_NAME } from './constant'
import { getSuperbConfig } from '../config/superb-config'

export function accessProperty(target: any, operator: string) {
  const keys: string[] = operator.split('.')
  return keys.reduce((value: any, key: string) => {
    if (value === null || value === undefined) {
      return null
    }
    return value[key]
  }, target)
}
export function getDirComponentNames(dir: string[]) {
  return dir.filter(
    (filename: string) =>
      ![...accessProperty(getSuperbConfig(), 'componentsIgnores'), 'index.js'].includes(filename)
  )
}
export function isDir(path: string): boolean {
  return pathExistsSync(path) && lstatSync(path).isDirectory()
}
export function isMD(path: string): boolean {
  return pathExistsSync(path) && extname(path) === '.md'
}

export function isSFC(path: string): boolean {
  return (pathExistsSync(path) && extname(path) === '.tsx') || extname(path) === '.jsx'
}
export function isExampleDir(path: string): boolean {
  return pathExistsSync(path) && parse(path).dir.endsWith(EXAMPLE_DIR_NAME)
}
export function isScript(path: string): boolean {
  return (
    (pathExistsSync(path) && extname(path) === '.js') ||
    extname(path) === '.ts' ||
    extname(path) === '.jsx' ||
    extname(path) === '.tsx'
  )
}
export function isLess(path: string): boolean {
  return pathExistsSync(path) && extname(path) === '.less'
}
export function isTestsDir(path: string): boolean {
  return pathExistsSync(path) && parse(path).dir.endsWith(TESTS_DIR_NAME)
}
export function replaceExt(path: string, ext: string): string {
  return path.replace(extname(path), ext)
}

export function bigCamelize(str: string): string {
  return str && camelize(str).replace(str.charAt(0), str.charAt(0).toUpperCase())
}
export function camelize(str: string): string {
  return str.replace(/-(\w)/g, (_: any, p: string) => p.toUpperCase())
}
