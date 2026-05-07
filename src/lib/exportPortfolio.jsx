import { renderToStaticMarkup } from 'react-dom/server'
import ScrollingTemplate from '../templates/ScrollingTemplate.jsx'
import NavTemplate from '../templates/NavTemplate.jsx'
import CardTemplate from '../templates/CardTemplate.jsx'

const TEMPLATES = {
  scrolling: ScrollingTemplate,
  nav: NavTemplate,
  cards: CardTemplate,
}

export function generateAndDownload(data, layoutId) {
  const Template = TEMPLATES[layoutId]
  if (!Template) throw new Error(`Unknown layout: ${layoutId}`)

  const htmlBody = renderToStaticMarkup(<Template data={data} />)
  const fullHTML = `<!DOCTYPE html>\n${htmlBody}`

  const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const safeName = data.name
    ?.trim()
    .replace(/[^a-z0-9\s-]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase()

  const filename = safeName
    ? `${safeName}-portfolio.html`
    : 'portfolio.html'

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
