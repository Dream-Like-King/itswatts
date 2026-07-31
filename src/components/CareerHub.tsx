import { useState } from 'react'
import { Logo } from './Logo'
import { CareerPaths } from './CareerPaths'

type CareerHubProps = { onClose: () => void; onOpenResources: () => void }

const sdlc = [
  ['01', 'Discover', 'Clarify who the feature serves, what problem it solves, and the risks hidden in assumptions.'],
  ['02', 'Define', 'Review requirements early. Ask what success, failure, boundaries, and accessibility need to mean.'],
  ['03', 'Build', 'Partner with developers on testability, useful data, meaningful logging, and automation opportunities.'],
  ['04', 'Test', 'Use planned checks and exploration to learn how the experience behaves for real users and conditions.'],
  ['05', 'Release', 'Support release confidence with risk-based coverage, communication, monitoring, and a rollback plan.'],
  ['06', 'Learn', 'Use production feedback, defects, and support patterns to improve the product and the next delivery cycle.'],
] as const

export function CareerHub({ onClose, onOpenResources }: CareerHubProps) {
  const [activePhase, setActivePhase] = useState(0)
  const [number, title, copy] = sdlc[activePhase]
  return <main className="career-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo onHome={onClose} /><button type="button" onClick={onClose}>← Back to home</button></header>
    <section className="career-hero"><p className="eyebrow">CAREER PATHS</p><h1>Build a QA career<br />with <em>practice.</em></h1><p>Explore practical paths, useful certifications, and a starter guide for building experience one meaningful step at a time.</p></section>
    <section className="learn-section sdlc-section" id="sdlc"><p className="eyebrow">QA IN THE SDLC</p><div className="learn-split"><div><h2>Quality is a<br /><em>team sport.</em></h2><p className="learn-lead">Understanding where QA contributes across delivery helps you build the skills, relationships, and influence that support a quality-focused career.</p></div><div className="sdlc-panel"><div className="sdlc-steps" role="tablist" aria-label="QA in the software development lifecycle">{sdlc.map(([step, label], index) => <button type="button" key={step} className={activePhase === index ? 'active' : ''} onClick={() => setActivePhase(index)} role="tab" aria-selected={activePhase === index}><span>{step}</span>{label}</button>)}</div><article className="sdlc-detail"><p className="eyebrow">{number} · {title.toUpperCase()}</p><h3>{title} with quality in mind.</h3><p>{copy}</p></article></div></div></section>
    <CareerPaths onOpenResources={onOpenResources} />
  </main>
}
