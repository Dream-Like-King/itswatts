import { useState } from 'react'

const levels = [
  { name: 'Beginner', number: '01', summary: 'Start with the language, habits, and confidence to participate in QA conversations.', topics: ['What QA is and is not', 'Test cases and defect basics', 'Exploratory testing', 'Accessibility foundations'], next: 'Start with the QA essentials above, then use the Knowledge Base when a new term comes up.' },
  { name: 'Intermediate', number: '02', summary: 'Move from executing checks to designing coverage around risk, users, and changing systems.', topics: ['Risk-based test design', 'API and integration thinking', 'Release readiness', 'Readable automation foundations'], next: 'Practice choosing what to automate and use the QA Toolkits to turn a feature into focused test ideas.' },
  { name: 'Advanced', number: '03', summary: 'Strengthen quality strategy, technical influence, and systems thinking across a delivery team.', topics: ['Quality strategy and metrics', 'Automation architecture', 'AI-assisted QA workflows', 'Coaching and quality advocacy'], next: 'Use the AI for QA and Automation Foundations paths, then apply the ideas to a real product workflow.' },
] as const

type LearningLevelsProps = { onOpenTools: () => void }

export function LearningLevels({ onOpenTools }: LearningLevelsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = levels[selectedIndex]

  return <section className="learn-section learning-levels" id="learning-levels">
    <p className="eyebrow">03 · CHOOSE YOUR LEVEL</p>
    <div className="level-heading"><h2>Learn at the pace<br />that fits <em>you.</em></h2><p>You do not need to master every topic at once. Pick the route closest to where you are today and follow one useful next step.</p></div>
    <div className="level-grid">{levels.map((level, index) => <button type="button" key={level.name} className={selectedIndex === index ? 'active' : ''} onClick={() => setSelectedIndex(index)} aria-pressed={selectedIndex === index}><span>{level.number}</span><h3>{level.name}</h3><p>{level.summary}</p><b>{selectedIndex === index ? 'Selected' : 'View route'} <i aria-hidden="true">↗</i></b></button>)}</div>
    <article className="level-detail" aria-live="polite"><p className="eyebrow">{selected.number} · {selected.name.toUpperCase()} ROUTE</p><h3>{selected.name} QA, with a clear next step.</h3><p>{selected.next}</p><ul>{selected.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul><button type="button" onClick={onOpenTools}>Open the QA Toolkits <span aria-hidden="true">↗</span></button></article>
  </section>
}
