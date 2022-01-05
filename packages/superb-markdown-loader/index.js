const markdown = require('markdown-it')
const hljs = require('highlight.js')

function highlight(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    return (
      '<pre class="hljs">' +
      '<code>' +
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css" />' +
      `${hljs.highlight(str, { language: lang }).value}` +
      '</code>' +
      '</pre>'
    )
  }
  return ''
}
function markLoader(source) {
  const md = markdown({
    breaks: true,
    highlight,
  })
  const html = md.render(source)
  const str = '`' + html + '`'
  return `export default ${str}`
}

module.exports = markLoader
