import React from 'react'
import Button from '../button'
import '../button.less'
//@ts-ignore
import Md from '../docs/zh-CN.md'

// console.log(Md, '----');

const strsub = (str: string, tag: string = 'h3') => {
  var endTag = `</${tag}>`
  const startIndex = str.indexOf(`<${tag}>`)
  const endIndex = str.indexOf(endTag) + endTag.length
  return str.substring(startIndex, endIndex)
}
const hGroup = (str: string, tag: string) => {
  const reg = new RegExp(tag, 'g')
  var list = str.replace(reg, `:::${tag}`).split(':::')
  list.shift()
  return list || []
}
let hGroups = hGroup(Md, '<div class="card')
console.log(hGroups)

const ThemeButton = () => {
  return (
    <>
      <Button type="success">成功按钮</Button>
      <Button type="info">普通按钮</Button>
      <Button type="primary">主要按钮</Button>
    </>
  )
}
const TextButton = () => {
  return (
    <>
      <Button type="success">成功按钮</Button>
      <Button type="info">普通按钮</Button>
      <Button type="primary">主要按钮</Button>
    </>
  )
}
const ExampleList = [
  { component: <ThemeButton />, title: '主题色按钮' },
  { component: <TextButton />, title: '测试按钮' },
  { component: <TextButton />, title: 'API' },
]
const ExampleButton = () => {
  return (
    <>
      {ExampleList.map((item, index) => {
        if (strsub(hGroups[index]).indexOf(item.title) > -1) {
          console.log(hGroups[index], 'hGroups[index]')

          return (
            <div key={item.title} className="markdown">
              <div
                className="markdown-title"
                dangerouslySetInnerHTML={{ __html: strsub(hGroups[index]) }}
              ></div>
              <div className="markdown-demo">{item.component}</div>
              <div
                className="markdown-code"
                dangerouslySetInnerHTML={{ __html: hGroups[index] }}
              ></div>
            </div>
          )
        }
      })}
    </>
  )
}
export default ExampleButton
