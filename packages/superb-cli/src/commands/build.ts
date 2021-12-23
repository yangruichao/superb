import webpack from 'webpack'
import { getBuildConfig } from '../config/webpack.build.config'
import { setProd } from '../shared/env'
import logger from '../shared/logger'

export async function build() {
  try {
    setProd()
    const config = getBuildConfig()

    webpack(config, (err, stats) => {
      err && logger.error(err.toString())
      stats?.hasErrors() && logger.error(stats)
    })
  } catch (e: any) {
    logger.error(e)
  }
}
