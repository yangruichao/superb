import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { getPort } from 'portfinder'
import { getDevConfig } from '../config/webpack.dev.config'
import { isDev, setDev } from '../shared/env'
import logger from '../shared/logger'
import { buildPcSiteRoutes } from '../compiler/compileSiteEntry'
import { SRC_DIR } from '../shared/constant'
import { ensureDirSync } from 'fs-extra'

export function runDevServer(port: number, config: any) {
  const { host } = config.devServer
  const devServerOptions = { ...config.devServer, open: true }
  const server = new WebpackDevServer(devServerOptions, webpack(config))

  server.startCallback((err) => {
    if (err) {
      logger.error(err.toString())
      return
    }
    logger.success(`Successfully started server at http://${host}:${port}`)
  })
}

async function startServer() {
  await Promise.all([buildPcSiteRoutes()])
  const config = getDevConfig()

  const { port } = config.devServer
  getPort(
    {
      port,
    },
    (err: Error, port: number) => {
      if (err) {
        logger.error(err.toString())
        return
      }
      runDevServer(port, config)
    }
  )
}

export async function dev() {
  await setDev()

  await ensureDirSync(SRC_DIR)

  await startServer()
}
