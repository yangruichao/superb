import React from 'react'
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom'
// @ts-ignore
import RouteLists from './routes'

// const routes = RouteLists.map(item => (
//   {
//     path: item.path,
//     component: item.loader
//   }
// ))
// console.log(routes, 'RouteLists');
const Home = (name?: string) => {
  return (
    <div>
      <Link to="/button/docs">跳转</Link>
    </div>
  )
}
const About = () => {
  return <div>about</div>
}
const App = function () {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {RouteLists.map((item) => {
          return <Route key={item.path} path={item.path} element={item.component} />
        })}
      </Routes>
    </BrowserRouter>
  )
}
export default App
