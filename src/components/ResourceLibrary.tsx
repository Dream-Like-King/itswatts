import { useEffect, useMemo, useState } from 'react'

type Resource = {
  category: 'Automation' | 'AI + QA' | 'Quality basics'
  type: 'Template' | 'Tool' | 'Guide'
  title: string
  description: string
  href: string
  download?: boolean
}

const resources: Resource[] = [
  { category: 'Automation', type: 'Guide', title: 'Automation decision guide', description: 'Use four practical signals to decide whether a workflow is ready for automation.', href: '#tools' },
  { category: 'Automation', type: 'Template', title: 'Automation decision checklist', description: 'A lightweight worksheet for choosing automation, exploration, or a blended approach.', href: '/downloads/automation-decision-checklist.md', download: true },
  { category: 'Automation', type: 'Template', title: 'QA test case starter', description: 'Turn a feature or user story into focused coverage ideas and questions.', href: '/downloads/test-case-starter.md', download: true },
  { category: 'Automation', type: 'Template', title: 'Exploratory testing charter', description: 'Give a time-boxed test session a focused mission and useful notes.', href: '/downloads/exploratory-testing-charter.md', download: true },
  { category: 'AI + QA', type: 'Tool', title: 'QA prompt library', description: 'Reusable prompts for test planning, bug investigation, and release readiness.', href: '#tools' },
  { category: 'AI + QA', type: 'Guide', title: 'AI can accelerate QA', description: 'A short note on using AI as a thinking partner without replacing curiosity.', href: '#weekly' },
  { category: 'AI + QA', type: 'Tool', title: 'Ask Watt', description: 'Bring a QA question and get a concise, practical starting point.', href: '#ask-watt' },
  { category: 'Quality basics', type: 'Template', title: 'Bug report template', description: 'A clear structure for communicating defects, context, and impact.', href: '/downloads/bug-report-template.md', download: true },
  { category: 'Quality basics', type: 'Template', title: 'Release readiness checklist', description: 'A short risk-aware conversation before a release moves forward.', href: '/downloads/release-readiness-checklist.md', download: true },
  { category: 'Quality basics', type: 'Guide', title: 'Quality essentials path', description: 'Explore accessibility, risk, defect reporting, and release confidence.', href: '#learn' },
  { category: 'Quality basics', type: 'Guide', title: 'Weekly Notes', description: 'Short, practical lessons for building a more thoughtful QA practice.', href: '#weekly' },
]

const featuredResources = [resources[2], resources[3], resources[6]]
const filters = ['All', 'Automation', 'AI + QA', 'Quality basics'] as const
type Filter = typeof filters[number]

function ResourceCard({ resource, onOpenChat, onOpenToolkits }: { resource: Resource; onOpenChat: () => void; onOpenToolkits: () => void }) {
  return <article>
    <div className="resource-meta"><span>{resource.category}</span><i>{resource.type}</i></div>
    <h3>{resource.title}</h3>
    <p>{resource.description}</p>
    {resource.title === 'Ask Watt' ? <button type="button" className="resource-open" onClick={onOpenChat}>Open resource <b aria-hidden="true">↗</b></button> : resource.href === '#tools' ? <button type="button" className="resource-open" onClick={onOpenToolkits}>Open resource <b aria-hidden="true">↗</b></button> : <a href={resource.href} download={resource.download}>{resource.download ? 'Download resource' : 'Open resource'} <b aria-hidden="true">↗</b></a>}
  </article>
}

export function ResourceLibrary({ onOpenChat, onOpenToolkits }: { onOpenChat: () => void; onOpenToolkits: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<Filter>('All')
  const visibleResources = useMemo(() => filter === 'All' ? resources : resources.filter((resource) => resource.category === filter), [filter])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return <section className="resource-library section" id="resources">
    <div className="resource-summary">
      <div><p className="eyebrow">RESOURCE LIBRARY</p><h2>Useful QA<br /><em>starters.</em></h2></div>
      <div><p>A compact collection of templates, tools, and guides for the work in front of you.</p><button type="button" className="button outline" onClick={() => setIsOpen(true)}>Browse all {resources.length} resources <span aria-hidden="true">↗</span></button></div>
    </div>
    <div className="resource-grid resource-featured">{featuredResources.map((resource) => <ResourceCard key={resource.title} resource={resource} onOpenChat={onOpenChat} onOpenToolkits={onOpenToolkits} />)}</div>
    <p className="resource-request">Have a QA topic you want covered? <a href="mailto:watson.derrick@outlook.com?subject=It%E2%80%99s%20Watts%20resource%20idea">Suggest a resource ↗</a></p>
    {isOpen && <div className="resource-overlay" role="presentation" onMouseDown={() => setIsOpen(false)}>
      <article className="resource-dialog" role="dialog" aria-modal="true" aria-labelledby="resource-library-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="resource-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close resource library">×</button>
        <p className="eyebrow">RESOURCE LIBRARY</p><h2 id="resource-library-title">Find your next<br /><em>useful step.</em></h2>
        <div className="resource-toolbar"><div className="resource-filters" role="group" aria-label="Filter resources by topic">{filters.map((item) => <button type="button" key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div><p>{visibleResources.length} {visibleResources.length === 1 ? 'resource' : 'resources'}</p></div>
      <div className="resource-grid resource-full">{visibleResources.map((resource) => <ResourceCard key={resource.title} resource={resource} onOpenChat={onOpenChat} onOpenToolkits={onOpenToolkits} />)}</div>
      </article>
    </div>}
  </section>
}
