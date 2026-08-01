import { Logo } from './Logo'
import { FocusTools } from './FocusTools'
import { ThemeToggle } from './ThemeToggle'

export function SoftwareHub({ onClose, theme, onToggleTheme }: { onClose: () => void; theme: 'light' | 'dark'; onToggleTheme: () => void }) {
  return <main className="software-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo onHome={onClose} /><div className="hub-nav-actions"><ThemeToggle theme={theme} onToggle={onToggleTheme} /><button type="button" onClick={onClose}>← Back to home</button></div></header>
    <section className="resource-hub-hero"><p className="eyebrow">QA SOFTWARE GUIDE</p><h1>Software for<br /><em>quality work.</em></h1><p>Explore the tools and platforms that support practical QA work across a delivery cycle.</p></section>
    <FocusTools />
  </main>
}
