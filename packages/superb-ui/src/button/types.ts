import React from 'react'

export type ButtonType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'
export type ButtonSize = 'small' | 'mini' | 'large' | 'normal'

export interface ButtonProps {
  type?: ButtonType
  text?: boolean
  outline?: boolean
  disabled?: boolean
  loading?: boolean
  LoadingType?: string
  size?: ButtonSize
  round?: boolean
  block?: boolean
  className?: string
  children?: React.ReactNode
}
