import React from 'react'
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom'
import routerList from './router'

const Home = function() {
  return (
    <div>
      <Link to="/zh-CN/button">跳转</Link>
    </div>
  )
}
const App = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {routerList.map((item) => <Route key={item.path} path={item.path} element={<item.component />} />)}
      </Routes>
    </BrowserRouter>
  )
}
export default App
