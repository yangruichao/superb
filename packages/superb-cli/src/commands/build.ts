import { ensureDirSync } from 'fs-extra'
import webpack from 'webpack'
import { buildPcSiteRoutes } from '../compiler/compileSiteEntry'
import { getBuildConfig } from '../config/webpack.build.config'
import { SRC_DIR } from '../shared/constant'
import { setProd } from '../shared/env'
import logger from '../shared/logger'

export async function build() {
  setProd()

  ensureDirSync(SRC_DIR)

  await Promise.all([buildPcSiteRoutes()])
  const config = getBuildConfig()

  webpack(config, (err, stats) => {
    err && logger.error(err.toString())
    stats?.hasErrors() && logger.error(stats)
  })
}
