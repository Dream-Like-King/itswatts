import { useMemo, useState } from 'react'

const terms = [
  ['Accessibility', 'Designing and testing so people with different abilities can use a product successfully.', 'Quality basics'],
  ['API', 'The connection that lets systems exchange data and actions without a person using the interface.', 'Technical'],
  ['CI/CD', 'Automated practices for integrating changes, checking them, and delivering software more consistently.', 'Delivery'],
  ['Defect', 'A difference between expected behavior and what the product actually does.', 'Quality basics'],
  ['Exploratory testing', 'Learning about a product through thoughtful investigation while designing and running checks.', 'Testing'],
  ['Regression testing', 'Checking that existing behavior still works after a change.', 'Testing'],
  ['Severity', 'How much a defect affects users, the business, or the product.', 'Quality basics'],
  ['Smoke testing', 'A short set of checks that confirms a build is stable enough for deeper testing.', 'Testing'],
  ['Test case', 'A documented set of conditions and steps used to check an expected behavior.', 'Testing'],
  ['Test plan', 'A practical outline of what to test, why it matters, and how the work will be approached.', 'Planning'],
  ['Priority', 'How urgently a team should address a defect compared with other work.', 'Quality basics'],
  ['Risk', 'The likelihood and impact of something going wrong for users, the business, or delivery.', 'Planning'],
] as const

export function KnowledgeBase() {
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const matchingTerms = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return normalized ? terms.filter(([term, definition, category]) => `${term} ${definition} ${category}`.toLowerCase().includes(normalized)) : terms
  }, [query])
  const isSearching = query.trim().length > 0
  const visibleTerms = isSearching || showAll ? matchingTerms : matchingTerms.slice(0, 8)

  return <section className="learn-section knowledge-base" id="knowledge-base">
    <p className="eyebrow">04 · KNOWLEDGE BASE</p>
    <div className="learn-split"><div><h2>QA terms, made<br /><em>less mysterious.</em></h2><p className="learn-lead">A plain-language starting point for the terms you will hear in product conversations, test plans, and defect reports.</p></div><div>
      <label className="knowledge-search" htmlFor="knowledge-search"><span>SEARCH TERMS</span><input id="knowledge-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try regression, API, or risk" /></label>
      <p className="knowledge-count">{visibleTerms.length} of {matchingTerms.length} {matchingTerms.length === 1 ? 'term' : 'terms'} shown</p>
      {visibleTerms.length ? <div className="knowledge-list">{visibleTerms.map(([term, definition, category]) => <article key={term}><p>{category}</p><h3>{term}</h3><span>{definition}</span></article>)}</div> : <div className="knowledge-empty"><h3>No match yet.</h3><p>Try a broader word, or return to the QA and SDLC sections for a practical example.</p></div>}
      {!isSearching && matchingTerms.length > 8 && <div className="knowledge-actions"><button type="button" className="button outline" onClick={() => setShowAll((current) => !current)} aria-expanded={showAll}>{showAll ? 'Show popular terms' : 'Browse all terms'} <span aria-hidden="true">↗</span></button></div>}
    </div></div>
  </section>
}
