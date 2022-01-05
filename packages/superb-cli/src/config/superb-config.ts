import { pathExistsSync } from 'fs-extra'
import { SUPERB_CONFIG } from '../shared/constant'

export const defaultConfig = {
  docs: {
    title: 'Superb 组件库文档',
    description: 'Superb 组件库文档',
    logo: 'https://reactjs.org/favicon.ico',
  },
}

export function getSuperbConfig() {
  return (pathExistsSync(SUPERB_CONFIG) && require(SUPERB_CONFIG)) || defaultConfig
}
