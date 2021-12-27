import React from 'react'
import './index.less'

interface Props {
  name: string
}

const SuButton = function(props: Props) {
  return <div className="su-button">{props.name}</div>
}

export default SuButton
