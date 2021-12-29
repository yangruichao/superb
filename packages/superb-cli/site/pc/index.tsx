import ReactDOM from 'react-dom'
import App from './App'
import React from 'react'
import './App.less'

console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')

ReactDOM.render(<App />, document.getElementById('root'))
