import React from 'react'
import classNames from 'classnames'
import { ButtonProps } from './types'

const prefixCls = 'superb-btn'

const Button = function (props: ButtonProps) {
  const { type, size, className } = props
  const classes = classNames(
    'superb-btn',
    {
      [`${prefixCls}--${type}`]: true,
      [`${prefixCls}--${size}`]: size,
    },
    className
  )
  return <button className={classes}>{props.children}</button>
}

export default Button
