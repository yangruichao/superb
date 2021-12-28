import { pathExistsSync, readdir, readdirSync, writeFile } from 'fs-extra'
import { DOCS_DIR_NAME, SITE_PC_ROUTES, SRC_DIR } from '../shared/constant'
import { resolve } from 'path'
import slash from 'slash'
import { isMD } from '../shared/fsUtils'

const COMPONENT_DOCS_RE = /\/([-\w]+)\/([-\w]+)\.md/

export function getComponentDocsRoutePath(componentDocsPath: string): string {
  const [_, routePath, language] = componentDocsPath.match(COMPONENT_DOCS_RE) ?? []
  return `/${language}/${routePath}`
}

export async function findComponentDocsPaths(): Promise<string[]> {
  const dir: string[] = await readdir(SRC_DIR)

  const buildPath = (filename: string) => resolve(SRC_DIR, filename, DOCS_DIR_NAME)

  const existPath = (filename: string) => pathExistsSync(buildPath(filename))

  const collectRoutePath = (routePaths: string[], filename: string) => {
    const dirPath = buildPath(filename)

    readdirSync(dirPath).forEach((mdName: string) => {
      const path = resolve(dirPath, mdName)

      isMD(path) && routePaths.push(slash(path))
    })

    return routePaths
  }
  return dir.filter(existPath).reduce(collectRoutePath, [])
}
export async function buildPcSiteRoutes() {
  const [componentDocsPaths] = await Promise.all([findComponentDocsPaths()])
  console.log(componentDocsPaths, 'componentDocsPaths')

  const componentDocsRoutes = componentDocsPaths.map(
    (componentDocsPath) => `
  {
    path: '${getComponentDocsRoutePath(componentDocsPath)}',
    // @ts-ignore
    component: () => import('${componentDocsPath}')
  }\
`
  )

  //   const rootDocsRoutes = rootDocsPaths.map(
  //     (rootDocsPath) => `
  //   {
  //     path: '${getRootDocsRoutePath(rootDocsPath)}',
  //     // @ts-ignore
  //     component: () => import('${rootDocsPath}')
  //   }\
  // `
  //   )

  await writeFile(
    SITE_PC_ROUTES,
    `export default [\
  ${[...componentDocsRoutes].join(',')}
]`
  )
}
