const markdown = require('markdown-it')
const hljs = require('highlight.js')

function highlight(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    return (
      '<pre class="hljs">' +
      '<code>' +
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css" />' +
      hljs.highlight(str, { language: lang }).value +
      '</code>' +
      '</pre>'
    )
  }
  return ''
}

function htmlWrapper(html) {
  const group = html.replace(/class/g, 'className')
  return group
}

function markLoader(source) {
  const md = markdown({
    html: true,
    highlight,
  })
  const html = htmlWrapper(md.render(source))
  return `
  import React from 'react'\n
  const Jsx = () => <div className="superb-docs">${html}</div> \n
  export default Jsx
  `
}

module.exports = markLoader
