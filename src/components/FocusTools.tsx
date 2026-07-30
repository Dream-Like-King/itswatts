import { useMemo, useState } from 'react'
import { explorationTools } from '../data/site'

const categories = ['All', 'Automation', 'AI + QA', 'Delivery + SDLC'] as const
type Category = typeof categories[number]

export function FocusTools() {
  const [category, setCategory] = useState<Category>('All')
  const [selectedName, setSelectedName] = useState('Playwright')
  const visibleTools = useMemo(() => category === 'All' ? explorationTools : explorationTools.filter((tool) => tool.category === category), [category])
  const selected = explorationTools.find((tool) => tool.name === selectedName) ?? explorationTools[0]

  return <section className="focus-tools section" id="focus-tools">
    <div className="focus-tools-heading"><p className="eyebrow">QA SOFTWARE GUIDE</p><h2>Software for<br /><em>quality work.</em></h2><p>Select a tool or platform to see how it can support thoughtful QA work across a delivery cycle.</p></div>
    <div className="focus-tools-main">
      <div className="focus-tool-filters" role="group" aria-label="Filter tools by category">{categories.map((item) => <button type="button" key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div>
      <div className="focus-tool-list" aria-label="Tool list">{visibleTools.map((tool) => <button type="button" key={tool.name} className={selected.name === tool.name ? 'active' : ''} onClick={() => setSelectedName(tool.name)}><span>{tool.category}</span>{tool.name}<b aria-hidden="true">↗</b></button>)}</div>
      <article className="focus-tool-detail" aria-live="polite"><p className="eyebrow">{selected.category.toUpperCase()}</p><h3>{selected.name}</h3><p>{selected.description}</p><div><b>Everyday QA use</b><span>{selected.use}</span></div></article>
    </div>
  </section>
}
