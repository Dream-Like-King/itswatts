import { useMemo, useState } from 'react'

type GuideId = 'automation-ai' | 'test-design' | 'api-testing' | 'rag-training'

const guides: Array<{ id: GuideId; title: string; lessons: number; storageKey: string }> = [
  { id: 'automation-ai', title: 'Automation + AI', lessons: 5, storageKey: 'its-watt-automation-ai-guide-progress' },
  { id: 'test-design', title: 'Test Design', lessons: 6, storageKey: 'its-watt-test-design-guide-progress' },
  { id: 'api-testing', title: 'API Testing', lessons: 6, storageKey: 'its-watt-api-guide-progress' },
  { id: 'rag-training', title: 'RAG Training', lessons: 6, storageKey: 'its-watt-rag-guide-progress' },
]

type LearningToolsProps = {
  onOpenGuide: (guide: GuideId) => void
  onOpenPractice: () => void
  onOpenToolkits: () => void
  onJumpToKnowledge: () => void
}

function readProgress() {
  return guides.map((guide) => {
    const lesson = Number(localStorage.getItem(guide.storageKey))
    const updated = Number(localStorage.getItem(`${guide.storageKey}-updated`))
    return { ...guide, lesson: Number.isInteger(lesson) && lesson >= 0 && lesson < guide.lessons ? lesson : null, updated: Number.isFinite(updated) ? updated : 0 }
  })
}

export function LearningProgress({ onOpenGuide }: Pick<LearningToolsProps, 'onOpenGuide'>) {
  const [version, setVersion] = useState(0)
  const progress = useMemo(() => readProgress(), [version])
  const started = progress.filter((guide) => guide.lesson !== null)
  const latest = [...started].sort((a, b) => b.updated - a.updated)[0]
  const lessonsReached = progress.reduce((total, guide) => total + (guide.lesson === null ? 0 : guide.lesson + 1), 0)
  const totalLessons = guides.reduce((total, guide) => total + guide.lessons, 0)
  const percentage = Math.round((lessonsReached / totalLessons) * 100)
  const reset = () => {
    guides.forEach((guide) => { localStorage.removeItem(guide.storageKey); localStorage.removeItem(`${guide.storageKey}-updated`) })
    setVersion((current) => current + 1)
  }

  return <section className="learning-progress" aria-labelledby="learning-progress-title">
    <div><p className="eyebrow">YOUR LEARNING</p><h2 id="learning-progress-title">Pick up where<br /><em>you left off.</em></h2><p>{started.length ? `${started.length} of ${guides.length} Field Guides started on this device.` : 'Open a Field Guide and your most recent lesson will be saved here.'}</p></div>
    <div className="learning-progress-panel"><div className="learning-meter" aria-label={`${percentage}% of field guide lessons reached`}><span style={{ width: `${percentage}%` }} /></div><p className="learning-progress-count">{percentage}% learning progress</p>{latest ? <><p className="eyebrow">CONTINUE LEARNING</p><h3>{latest.title}</h3><p>Resume at lesson {latest.lesson! + 1} of {latest.lessons}.</p><button type="button" className="button primary" onClick={() => onOpenGuide(latest.id)}>Continue learning <span>↗</span></button><button type="button" className="learning-reset" onClick={reset}>Reset saved progress</button></> : <p className="learning-empty">Your latest Field Guide will appear here after you open one.</p>}</div>
  </section>
}

const searchTopics: Array<{ title: string; area: string; copy: string; terms: string; action: 'guide' | 'practice' | 'toolkits' | 'knowledge'; guide?: GuideId }> = [
  { title: 'Automation + AI', area: 'Field Guide', copy: 'Decide when repeatable automation, AI support, and human exploration help most.', terms: 'automation ai workflow copilot human judgment', action: 'guide', guide: 'automation-ai' },
  { title: 'Test Design', area: 'Field Guide', copy: 'Use risk, boundaries, decisions, states, and pairwise techniques.', terms: 'test design boundary state decision table pairwise risk', action: 'guide', guide: 'test-design' },
  { title: 'API Testing', area: 'Field Guide', copy: 'Learn requests, responses, validation, and authorization.', terms: 'api request response http status authorization authentication', action: 'guide', guide: 'api-testing' },
  { title: 'RAG Training', area: 'Field Guide', copy: 'Test evidence-led AI answers, retrieval, source access, and fallback behavior.', terms: 'rag retrieval ai source grounding prompt injection', action: 'guide', guide: 'rag-training' },
  { title: 'QA Terms', area: 'Knowledge Base', copy: 'Search plain-language definitions for QA vocabulary.', terms: 'qa terms regression defect severity risk accessibility', action: 'knowledge' },
  { title: 'Practice Lab', area: 'Practice', copy: 'Use scenarios, Bug Hunt, and Fix the Code to apply what you learn.', terms: 'practice scenario bug hunt fix code challenge', action: 'practice' },
  { title: 'QA Toolkits', area: 'Tools', copy: 'Use the automation guide, test case starter, and prompt library.', terms: 'toolkit test case starter prompt automation guide', action: 'toolkits' },
]

export function LearningSearch({ onOpenGuide, onOpenPractice, onOpenToolkits, onJumpToKnowledge }: LearningToolsProps) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => { const normalized = query.trim().toLowerCase(); return normalized.length < 2 ? [] : searchTopics.filter((topic) => `${topic.title} ${topic.area} ${topic.copy} ${topic.terms}`.toLowerCase().includes(normalized)) }, [query])
  const open = (topic: typeof searchTopics[number]) => {
    if (topic.action === 'guide' && topic.guide) onOpenGuide(topic.guide)
    if (topic.action === 'practice') onOpenPractice()
    if (topic.action === 'toolkits') onOpenToolkits()
    if (topic.action === 'knowledge') onJumpToKnowledge()
  }
  return <section className="learning-search" aria-labelledby="learning-search-title"><div><p className="eyebrow">FIND A TOPIC</p><h2 id="learning-search-title">Search the<br /><em>learning hub.</em></h2></div><div><label htmlFor="learning-search-input">SEARCH GUIDES, TERMS, AND PRACTICE</label><input id="learning-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try API, accessibility, or boundaries" />{query.trim().length > 1 && <div className="learning-search-results" aria-live="polite">{results.length ? results.map((topic) => <button type="button" key={topic.title} onClick={() => open(topic)}><span>{topic.area}</span><b>{topic.title}</b><small>{topic.copy}</small><i aria-hidden="true">↗</i></button>) : <p>No match yet. Try a broader QA term.</p>}</div>}</div></section>
}

export function LearningPacks() {
  const packs = [
    ['QA beginner starter pack', 'Terms, a 30-day starting plan, and practice ideas.', '/downloads/qa-beginner-starter-pack.md'],
    ['API testing cheat sheet', 'Request, response, status, and validation reminders.', '/downloads/api-testing-cheat-sheet.md'],
    ['Test design worksheet', 'A practical worksheet for risk, boundaries, rules, and states.', '/downloads/test-design-worksheet.md'],
    ['Automation readiness checklist', 'A quick decision aid for choosing automation or exploration.', '/downloads/automation-readiness-checklist.md'],
  ] as const
  return <section className="learning-packs" aria-labelledby="learning-packs-title"><div><p className="eyebrow">DOWNLOADABLE PACKS</p><h2 id="learning-packs-title">Take the next<br /><em>step with you.</em></h2></div><div>{packs.map(([title, copy, href], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p><a href={href} download>Download <b aria-hidden="true">↧</b></a></article>)}</div></section>
}
