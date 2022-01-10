import React from 'react'
import Button from '../button'
//@ts-ignore
import Md from '../docs/zh-CN.md'
import './index.less'
import '../style'

import ExampleCode from '../../../../superb-cli/site/comonents/ExampleCode'

const ThemeButton = () => {
  return (
    <div className="exampleButton">
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="info">普通按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
    </div>
  )
}
const TextButton = () => {
  return (
    <div className="exampleButton">
      <Button text outline type="primary">
        外边框按钮
      </Button>
      <Button text type="info">
        纯文字按钮
      </Button>
      <Button text type="success">
        成功按钮
      </Button>
      <Button text type="warning">
        警告按钮
      </Button>
      <Button text type="danger">
        危险按钮
      </Button>
    </div>
  )
}
const DisabledButton = () => {
  return (
    <div className="exampleButton">
      <Button disabled outline type="primary">
        主要按钮
      </Button>
      <Button disabled text outline type="info">
        普通按钮
      </Button>
      <Button disabled text type="success">
        成功按钮
      </Button>
    </div>
  )
}
const BlockButton = () => {
  return (
    <Button block type="primary">
      块级按钮
    </Button>
  )
}
const SizeButton = () => {
  return (
    <div className="exampleButton">
      <Button size="mini" type="info">
        迷你按钮
      </Button>
      <Button size="small" type="success">
        小型按钮
      </Button>
      <Button type="primary">常规按钮</Button>
      <Button size="large" type="danger">
        大型按钮
      </Button>
    </div>
  )
}
const ExampleList = [
  { component: '', title: '按钮' },
  { component: '', title: '引入' },
  { component: <ThemeButton />, title: '主题色按钮' },
  { component: <TextButton />, title: '文字按钮' },
  { component: <DisabledButton />, title: '禁用状态' },
  { component: <BlockButton />, title: '块级按钮' },
  { component: <SizeButton />, title: '按钮尺寸' },
  { component: '', title: 'API' },
]
const ExampleButton = () => {
  return <ExampleCode componentList={ExampleList} source={Md}></ExampleCode>
}
export default ExampleButton
