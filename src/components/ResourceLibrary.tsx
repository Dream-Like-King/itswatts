import { useMemo, useState } from 'react'

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
  { category: 'AI + QA', type: 'Tool', title: 'QA prompt library', description: 'Reusable prompts for test planning, bug investigation, and release readiness.', href: '#tools' },
  { category: 'AI + QA', type: 'Guide', title: 'AI can accelerate QA', description: 'A short note on using AI as a thinking partner without replacing curiosity.', href: '#weekly' },
  { category: 'AI + QA', type: 'Tool', title: 'Ask Watt', description: 'Bring a QA question and get a concise, practical starting point.', href: '#ask-watt' },
  { category: 'Quality basics', type: 'Template', title: 'Bug report template', description: 'A clear structure for communicating defects, context, and impact.', href: '/downloads/bug-report-template.md', download: true },
  { category: 'Quality basics', type: 'Guide', title: 'Quality essentials path', description: 'Explore accessibility, risk, defect reporting, and release confidence.', href: '#learn' },
  { category: 'Quality basics', type: 'Guide', title: 'Weekly Notes', description: 'Short, practical lessons for building a more thoughtful QA practice.', href: '#weekly' },
]

const filters = ['All', 'Automation', 'AI + QA', 'Quality basics'] as const
type Filter = typeof filters[number]

export function ResourceLibrary() {
  const [filter, setFilter] = useState<Filter>('All')
  const visibleResources = useMemo(
    () => filter === 'All' ? resources : resources.filter((resource) => resource.category === filter),
    [filter],
  )

  return <section className="resource-library section" id="resources">
    <div className="section-heading">
      <p className="eyebrow">RESOURCE LIBRARY</p>
      <h2>Keep the useful<br /><em>stuff close.</em></h2>
      <p className="section-copy">A growing collection of practical QA starters. Browse by the skill you want to build next.</p>
    </div>
    <div className="resource-toolbar">
      <div className="resource-filters" role="group" aria-label="Filter resources by topic">
        {filters.map((item) => <button type="button" key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}
      </div>
      <p>{visibleResources.length} {visibleResources.length === 1 ? 'resource' : 'resources'}</p>
    </div>
    <div className="resource-grid">
      {visibleResources.map((resource) => <article key={resource.title}>
        <div className="resource-meta"><span>{resource.category}</span><i>{resource.type}</i></div>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <a href={resource.href} download={resource.download}> {resource.download ? 'Download resource' : 'Open resource'} <b aria-hidden="true">↗</b></a>
      </article>)}
    </div>
    <p className="resource-request">Have a QA topic you want covered? <a href="mailto:watson.derrick@outlook.com?subject=It%E2%80%99s%20Watt%20resource%20idea">Suggest a resource ↗</a></p>
  </section>
}
