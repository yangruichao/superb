import { pathExistsSync } from 'fs-extra'
import { SUPERB_CONFIG } from '../shared/constant'

export const defaultConfig = {
  pc: {
    title: 'Superb 组件库文档',
    description: 'Superb 组件库文档',
    logo: 'https://cn.vuejs.org/images/logo.png',
  },
  mobile: {
    title: 'Superb 组件库示例',
    description: 'Superb 组件库示例',
    logo: 'https://cn.vuejs.org/images/logo.png',
  },
}

export function getSuperbConfig() {
  return (pathExistsSync(SUPERB_CONFIG) && require(SUPERB_CONFIG)) || defaultConfig
}
