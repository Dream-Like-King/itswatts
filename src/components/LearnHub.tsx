import { Logo } from './Logo'
import { KnowledgeBase } from './KnowledgeBase'
import { LearningLevels } from './LearningLevels'
import { LearningPaths } from './LearningPaths'
import { ThemeToggle } from './ThemeToggle'

type LearnHubProps = { onClose: () => void; onOpenTools: () => void; onOpenPractice: () => void; onOpenApiGuide: () => void; onOpenRagTraining: () => void; theme: 'light' | 'dark'; onToggleTheme: () => void }

export function LearnHub({ onClose, onOpenTools, onOpenPractice, onOpenApiGuide, onOpenRagTraining, theme, onToggleTheme }: LearnHubProps) {
  return <main className="learn-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo onHome={onClose} /><div className="hub-nav-actions"><ThemeToggle theme={theme} onToggle={onToggleTheme} /><button type="button" onClick={onClose}>← Back to home</button></div></header>
    <section className="learn-hero"><p className="eyebrow">LEARN</p><h1>Quality starts<br />before <em>testing.</em></h1><p>Build a clear picture of what QA is, where it belongs in the delivery process, and what to explore next.</p><a href="#what-is-qa">Start with QA <span>↓</span></a></section>

    <section className="learn-section" id="what-is-qa"><p className="eyebrow">01 · WHAT IS QA?</p><div className="learn-split"><div><h2>QA helps teams<br />build software<br /><em>people can trust.</em></h2></div><div><p>Quality assurance is the practice of reducing avoidable surprises. It is not limited to finding bugs at the end of a project—it is the habit of asking better questions throughout the work.</p><div className="qa-principles"><article><span>USER</span><h3>Protect the experience</h3><p>Consider real people, real conditions, and the moments that make a feature confusing or inaccessible.</p></article><article><span>RISK</span><h3>Focus attention wisely</h3><p>Not every path carries the same impact. QA helps a team decide what deserves the most confidence first.</p></article><article><span>LEARNING</span><h3>Make feedback useful</h3><p>Good checks, defects, and release notes help the next person understand what happened and what to do next.</p></article></div></div></div></section>

    <LearningLevels onOpenTools={onOpenTools} />
    <LearningPaths />
    <KnowledgeBase />
    <section className="learn-api-preview"><div><p className="eyebrow">NEW · API TESTING</p><h2>Learn the system<br /><em>behind the screen.</em></h2><p>Work through a compact field guide on requests, responses, validation, authorization, and failure behavior.</p></div><button type="button" onClick={onOpenApiGuide}>Open API Testing Field Guide <span>↗</span></button></section>
    <section className="learn-api-preview learn-rag-preview"><div><p className="eyebrow">NEW · RAG TRAINING</p><h2>Help AI answer<br /><em>from evidence.</em></h2><p>Learn how retrieval-augmented generation works, how to test it, and how to keep AI answers relevant, grounded, and safe.</p></div><button type="button" onClick={onOpenRagTraining}>Open RAG Training <span>↗</span></button></section>
    <section className="learn-next"><p className="eyebrow">KEEP GOING</p><h2>Choose your next<br /><em>useful step.</em></h2><p>Explore the current Automation, AI for QA, and Quality Essentials paths. Use the Knowledge Base as you learn, then take a focused idea into your next sprint.</p><div><button type="button" onClick={onOpenPractice}>Open the Practice Lab <span>↗</span></button><button type="button" className="learn-next-link" onClick={() => document.getElementById('learning-paths')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Explore learning paths <span>↗</span></button></div></section>
  </main>
}
