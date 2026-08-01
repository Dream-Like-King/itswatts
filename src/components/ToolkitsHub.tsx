import { Logo } from './Logo'
import { QaToolkits } from './QaToolkits'
import { ThemeToggle } from './ThemeToggle'

export function ToolkitsHub({ onClose, theme, onToggleTheme }: { onClose: () => void; theme: 'light' | 'dark'; onToggleTheme: () => void }) {
  return <main className="toolkits-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo onHome={onClose} /><div className="hub-nav-actions"><ThemeToggle theme={theme} onToggle={onToggleTheme} /><button type="button" onClick={onClose}>← Back to home</button></div></header>
    <section className="toolkits-hero"><p className="eyebrow">QA TOOLKITS</p><h1>Useful tools.<br /><em>No fluff.</em></h1><p>Focused, practical helpers for making stronger testing decisions before you open a ticket, write a script, or start a release.</p></section>
    <QaToolkits />
  </main>
}
