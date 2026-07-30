import { useState } from 'react'
import { Logo } from './Logo'
import { KnowledgeBase } from './KnowledgeBase'
import { LearningLevels } from './LearningLevels'
import { LearningPaths } from './LearningPaths'

type LearnHubProps = { onClose: () => void; onOpenTools: () => void; onOpenPractice: () => void }

const sdlc = [
  ['01', 'Discover', 'Clarify who the feature serves, what problem it solves, and the risks hidden in assumptions.'],
  ['02', 'Define', 'Review requirements early. Ask what success, failure, boundaries, and accessibility need to mean.'],
  ['03', 'Build', 'Partner with developers on testability, useful data, meaningful logging, and automation opportunities.'],
  ['04', 'Test', 'Use planned checks and exploration to learn how the experience behaves for real users and conditions.'],
  ['05', 'Release', 'Support release confidence with risk-based coverage, communication, monitoring, and a rollback plan.'],
  ['06', 'Learn', 'Use production feedback, defects, and support patterns to improve the product and the next delivery cycle.'],
] as const

export function LearnHub({ onClose, onOpenTools, onOpenPractice }: LearnHubProps) {
  const [activePhase, setActivePhase] = useState(0)
  const [number, title, copy] = sdlc[activePhase]
  return <main className="learn-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo /><button type="button" onClick={onClose}>← Back to home</button></header>
    <section className="learn-hero"><p className="eyebrow">LEARN</p><h1>Quality starts<br />before <em>testing.</em></h1><p>Build a clear picture of what QA is, where it belongs in the delivery process, and what to explore next.</p><a href="#what-is-qa">Start with QA <span>↓</span></a></section>

    <section className="learn-section" id="what-is-qa"><p className="eyebrow">01 · WHAT IS QA?</p><div className="learn-split"><div><h2>QA helps teams<br />build software<br /><em>people can trust.</em></h2></div><div><p>Quality assurance is the practice of reducing avoidable surprises. It is not limited to finding bugs at the end of a project—it is the habit of asking better questions throughout the work.</p><div className="qa-principles"><article><span>USER</span><h3>Protect the experience</h3><p>Consider real people, real conditions, and the moments that make a feature confusing or inaccessible.</p></article><article><span>RISK</span><h3>Focus attention wisely</h3><p>Not every path carries the same impact. QA helps a team decide what deserves the most confidence first.</p></article><article><span>LEARNING</span><h3>Make feedback useful</h3><p>Good checks, defects, and release notes help the next person understand what happened and what to do next.</p></article></div></div></div></section>

    <section className="learn-section sdlc-section" id="sdlc"><p className="eyebrow">02 · QA IN THE SDLC</p><div className="learn-split"><div><h2>Quality is a<br /><em>team sport.</em></h2><p className="learn-lead">QA contributes at every stage of delivery. Select a stage to see where thoughtful testing can make the biggest difference.</p></div><div className="sdlc-panel"><div className="sdlc-steps" role="tablist" aria-label="QA in the software development lifecycle">{sdlc.map(([step, label], index) => <button type="button" key={step} className={activePhase === index ? 'active' : ''} onClick={() => setActivePhase(index)} role="tab" aria-selected={activePhase === index}><span>{step}</span>{label}</button>)}</div><article className="sdlc-detail"><p className="eyebrow">{number} · {title.toUpperCase()}</p><h3>{title} with quality in mind.</h3><p>{copy}</p></article></div></div></section>

    <LearningLevels onOpenTools={onOpenTools} />
    <LearningPaths />
    <KnowledgeBase />
    <section className="learn-next"><p className="eyebrow">KEEP GOING</p><h2>Choose your next<br /><em>useful step.</em></h2><p>Explore the current Automation, AI for QA, and Quality Essentials paths. Use the Knowledge Base as you learn, then take a focused idea into your next sprint.</p><div><button type="button" onClick={onOpenPractice}>Open the Practice Lab <span>↗</span></button><button type="button" className="learn-next-link" onClick={() => document.getElementById('learning-paths')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Explore learning paths <span>↗</span></button></div></section>
  </main>
}
