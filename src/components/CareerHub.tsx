import { Logo } from './Logo'
import { CareerPaths } from './CareerPaths'

type CareerHubProps = { onClose: () => void; onOpenResources: () => void }

export function CareerHub({ onClose, onOpenResources }: CareerHubProps) {
  return <main className="career-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo onHome={onClose} /><button type="button" onClick={onClose}>← Back to home</button></header>
    <section className="career-hero"><p className="eyebrow">CAREER PATHS</p><h1>Build a QA career<br />with <em>practice.</em></h1><p>Explore practical paths, useful certifications, and a starter guide for building experience one meaningful step at a time.</p></section>
    <CareerPaths onOpenResources={onOpenResources} />
  </main>
}
