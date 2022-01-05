import React from 'react'
import classNames from 'classnames'
import { ButtonProps } from './types'
import './button.less'

const prefixCls = 'superb-btn'

const Button = function (props: ButtonProps) {
  const {
    type = 'default',
    text,
    outline,
    disabled,
    round,
    size = 'normal',
    block,
    className,
  } = props
  const classes = classNames(
    'superb-btn',
    {
      [`${prefixCls}--${type}`]: type,
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--text`]: text,
      [`${prefixCls}--text-${type}`]: text,
      [`${prefixCls}--text-disabled`]: disabled,
      [`${prefixCls}--outline`]: outline,
      [`${prefixCls}--block`]: block,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--round`]: round,
    },
    className
  )
  return (
    <button className={classes}>
      <div className="superb-btn--content">{props.children}</div>
    </button>
  )
}

export default Button
