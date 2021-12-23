import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { getPort } from 'portfinder'
import { getDevConfig } from '../config/webpack.dev.config'
import { setDev } from '../shared/env'
import logger from '../shared/logger'
import { buildMobileSiteRoutes } from '../shared/fsUtils'

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

export async function dev() {
  setDev()
  await buildMobileSiteRoutes()
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
