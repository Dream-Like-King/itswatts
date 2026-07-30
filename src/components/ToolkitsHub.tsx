import { Logo } from './Logo'
import { QaToolkits } from './QaToolkits'

export function ToolkitsHub({ onClose }: { onClose: () => void }) {
  return <main className="toolkits-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo /><button type="button" onClick={onClose}>← Back to home</button></header>
    <section className="toolkits-hero"><p className="eyebrow">QA TOOLKITS</p><h1>Useful tools.<br /><em>No fluff.</em></h1><p>Focused, practical helpers for making stronger testing decisions before you open a ticket, write a script, or start a release.</p></section>
    <QaToolkits />
  </main>
}
