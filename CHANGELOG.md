# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.7.0](https://github.com/yangruichao/superb/compare/v0.6.1...v0.7.0) (2022-01-05)

### Bug Fixes

- **cli/webpack.base.config.ts:** 修复文件入口 ([62fc1d8](https://github.com/yangruichao/superb/commit/62fc1d81ffc60db72a1d38a9e66770d56fcc19f0))

### Features

- **superb-ui/button/**:\*\* 完善 button 按钮功能 ([078cb5b](https://github.com/yangruichao/superb/commit/078cb5b3746e8e46d994a927b7685b8ed1cbef5f))

## [0.6.1](https://github.com/yangruichao/superb/compare/v0.6.0...v0.6.1) (2021-12-30)

### Bug Fixes

- **packages/cli/webpack.build.config.js:** 修复 filename 'hash' to 'fullhash' ([b345de5](https://github.com/yangruichao/superb/commit/b345de5a70eafbdf1af9df9b059bf95724c1ea34))

# [0.6.0](https://github.com/yangruichao/superb/compare/v0.5.0...v0.6.0) (2021-12-30)

### Bug Fixes

- **eslint-config:** 添加规则 ([788b4d2](https://github.com/yangruichao/superb/commit/788b4d2faf25683d26781d2fdc3e26146f0e611e))
- **markdown-loader:** 重置版本号 0.1.0 ([375fd9e](https://github.com/yangruichao/superb/commit/375fd9ec08fd5033c8b151e254af256611020057))

### Features

- **packages/cli,packages/ui:** 修改文档生成方式 ([2ac456a](https://github.com/yangruichao/superb/commit/2ac456a33e10c93ab4aca7fd32bf818629532312))

# [0.5.0](https://github.com/yangruichao/superb/compare/v0.4.0...v0.5.0) (2021-12-29)

### Bug Fixes

- **cli/webpack.base.config:** 修复不能识别 ts 文件 ([5133347](https://github.com/yangruichao/superb/commit/5133347b854c6fe9496558a7c312569ec663ec49))
- **cli:** 修复 history 模式下，刷新 404 问题 ([a32655b](https://github.com/yangruichao/superb/commit/a32655b46b2fe4626fb3b9f33e1c0b70b75271f6))

### Features

- **cli:** 生成 react-router 配置文件 ([aa42b12](https://github.com/yangruichao/superb/commit/aa42b12433f4858fcaef3dce355d6c05bf8571fd))
- **packages/cli,packages/markdown-loader:** 读取 md 文档，并动态生成 react 路由 ([c64ef0b](https://github.com/yangruichao/superb/commit/c64ef0bb27725fea4e66094ab476d9f265fa7115))

# [0.4.0](https://github.com/yangruichao/superb/compare/v0.3.1...v0.4.0) (2021-12-27)

### Features

- 打包 UMD ([2bb13d2](https://github.com/yangruichao/superb/commit/2bb13d209c59d5c4ee1245704a337e6a8859c85d))

## [0.3.1](https://github.com/yangruichao/superb/compare/v0.3.0...v0.3.1) (2021-12-27)

### Bug Fixes

- **packages/superb-cli/package.json:** 添加处理 css 处理器依赖 ([3e09f33](https://github.com/yangruichao/superb/commit/3e09f33355a5d9741df96a8b593636895c4e995d))

# [0.3.0](https://github.com/yangruichao/superb/compare/v0.2.2...v0.3.0) (2021-12-27)

### Features

- **superb-cli:** 实现 compile 命令,可编译出 es,commonjs 规范两套发布代码|实现--watch 文件监听,按需编译有改动的文件 ([d6c1b48](https://github.com/yangruichao/superb/commit/d6c1b4871db1021eaeb0778ba38855aca32f57d1))

### BREAKING CHANGES

- **superb-cli:** @superb/cli, @superb/eslint-config, @superb/ui

## [0.2.2](https://github.com/yangruichao/superb/compare/v0.2.1...v0.2.2) (2021-12-23)

### Bug Fixes

- **packages/super-cli:** 搭建 React 开发环境 ([c01e52a](https://github.com/yangruichao/superb/commit/c01e52a6fd9692eb68841ccbf0b4c138b7ca0633))

## [0.2.1](https://github.com/yangruichao/superb/compare/v0.2.0...v0.2.1) (2021-12-23)

### Bug Fixes

- **packages/superb-cli:** 修复不能识别 ts, js, jsx, tsx 错误 ([25f77e4](https://github.com/yangruichao/superb/commit/25f77e41bda41f167a8db1c0c82d1cc4048d2aa2))
- **packages/superb-eslint-config:** 添加 jsx 规则 ([fe1caca](https://github.com/yangruichao/superb/commit/fe1caca227b60529f6f2e8f41f23ee3919756a49))
- **packages/superb-eslint-config:** 修复 eslint 'React' must be in scope when using JSX' errors ([78bc44a](https://github.com/yangruichao/superb/commit/78bc44ade1875346b7747667777091094cb757dd))

# [0.2.0](https://github.com/yangruichao/superb/compare/v0.1.1...v0.2.0) (2021-12-23)

### Features

- **packages/**:\*\* 实现 superb-cli dev build 命令 ([fe42941](https://github.com/yangruichao/superb/commit/fe42941bb355d9ec9acb61ec651aa3d4425c086c))
