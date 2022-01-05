# 按钮

按钮用于开始一个即时操作。

### 引入

```jsx
import { Button } from 'superb-ui'
```

### 主题色按钮

```jsx
ReactDOM.render(
  <>
    <Button type="primary">主要按钮</Button>
    <Button type="info">普通按钮</Button>
    <Button type="success">成功按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>
  </>
)
```

### 文字按钮

```jsx
ReactDOM.render(
  <>
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
  </>
)
```

### 禁用状态

```jsx
ReactDOM.render(
  <>
    <Button disabled outline type="primary">
      主要按钮
    </Button>
    <Button disabled text outline type="info">
      普通按钮
    </Button>
    <Button disabled text type="success">
      成功按钮
    </Button>
  </>
)
```

### 块级按钮

```jsx
ReactDOM.render(
  <>
    <Button block outline type="primary">
      主要按钮
    </Button>
  </>
)
```

### 按钮尺寸

```jsx
ReactDOM.render(
  <>
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
  </>
)
```

### API

| 参数      | 说明                                                                    | 类型      | 默认值    |
| --------- | ----------------------------------------------------------------------- | --------- | --------- |
| `type`    | 类型， 可选值为 `default` `primary` `info` `success` `warning` `danger` | _string_  | `default` |
| `text`    | 是否是文字按钮                                                          | _boolean_ | `false`   |
| `outline` | 是否使用外边框                                                          | _boolean_ | `false`   |
| `disable` | 禁用状态                                                                | _boolean_ | `false`   |
| `size`    | 尺寸， 可选值为 `normal` `mini` `small` `large`                         | _string_  | `normal`  |
| `block`   | 是否是块级元素                                                          | _boolean_ | `false`   |
