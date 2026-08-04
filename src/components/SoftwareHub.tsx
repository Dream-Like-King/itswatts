import { Logo } from './Logo'
import { FocusTools } from './FocusTools'
import { ThemeToggle } from './ThemeToggle'
import { PageDetails } from './PageDetails'

export function SoftwareHub({ onClose, theme, onToggleTheme }: { onClose: () => void; theme: 'light' | 'dark'; onToggleTheme: () => void }) {
  return <main className="software-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo onHome={onClose} /><div className="hub-nav-actions"><ThemeToggle theme={theme} onToggle={onToggleTheme} /><button type="button" onClick={onClose}>← Back to home</button></div></header>
    <section className="resource-hub-hero"><p className="eyebrow">QA SOFTWARE GUIDE</p><h1>Software for<br /><em>quality work.</em></h1><p>Explore the tools and platforms that support practical QA work across a delivery cycle.</p></section>
    <PageDetails title="Compare tools by the problem they help solve." summary="A tool is useful when it makes feedback clearer, faster, or safer—not because it is popular." items={['Open a tool to see its purpose, where it fits, and a practical use case.', 'Pair tool selection with your team workflow, testability, and data needs.', 'Build depth with one tool at a time, then practice explaining why you chose it.']} />
    <FocusTools />
  </main>
}
