import React from 'react'

export type ButtonType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'
export type ButtonSize = 'small' | 'mini' | 'large' | 'default'

export interface ButtonProps {
  type?: ButtonType
  text?: boolean
  disabled?: boolean
  loading?: boolean
  LoadingType?: string
  size?: ButtonSize
  round?: boolean
  block?: boolean
  className?: string
  children?: React.ReactNode
}
