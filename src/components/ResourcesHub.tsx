import { Logo } from './Logo'
import { ResourceLibrary } from './ResourceLibrary'
import { ThemeToggle } from './ThemeToggle'

type ResourcesHubProps = { onClose: () => void; onOpenChat: () => void; onOpenToolkits: () => void; onOpenLearn: () => void; onOpenWeekly: () => void; theme: 'light' | 'dark'; onToggleTheme: () => void }

export function ResourcesHub({ onClose, onOpenChat, onOpenToolkits, onOpenLearn, onOpenWeekly, theme, onToggleTheme }: ResourcesHubProps) {
  return <main className="resources-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo onHome={onClose} /><div className="hub-nav-actions"><ThemeToggle theme={theme} onToggle={onToggleTheme} /><button type="button" onClick={onClose}>← Back to home</button></div></header>
    <section className="resource-hub-hero"><p className="eyebrow">RESOURCE LIBRARY</p><h1>Useful QA<br /><em>starters.</em></h1><p>A compact collection of templates, tools, and guides for the work in front of you.</p></section>
    <ResourceLibrary onOpenChat={onOpenChat} onOpenToolkits={onOpenToolkits} onOpenLearn={onOpenLearn} onOpenWeekly={onOpenWeekly} />
  </main>
}
