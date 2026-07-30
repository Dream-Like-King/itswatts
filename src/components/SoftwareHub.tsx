import { Logo } from './Logo'
import { FocusTools } from './FocusTools'

export function SoftwareHub({ onClose }: { onClose: () => void }) {
  return <main className="software-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo /><button type="button" onClick={onClose}>← Back to home</button></header>
    <section className="resource-hub-hero"><p className="eyebrow">QA SOFTWARE GUIDE</p><h1>Software for<br /><em>quality work.</em></h1><p>Explore the tools and platforms that support practical QA work across a delivery cycle.</p></section>
    <FocusTools />
  </main>
}
