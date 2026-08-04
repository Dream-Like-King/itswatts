import { Logo } from './Logo'
import { KnowledgeBase } from './KnowledgeBase'
import { LearningLevels } from './LearningLevels'
import { LearningPaths } from './LearningPaths'
import { ThemeToggle } from './ThemeToggle'
import { LearningPacks, LearningProgress, LearningSearch } from './LearningTools'

type LearnHubProps = { onClose: () => void; onOpenTools: () => void; onOpenPractice: () => void; onOpenApiGuide: () => void; onOpenRagTraining: () => void; onOpenTestDesign: () => void; onOpenAutomationAi: () => void; theme: 'light' | 'dark'; onToggleTheme: () => void }

export function LearnHub({ onClose, onOpenTools, onOpenPractice, onOpenApiGuide, onOpenRagTraining, onOpenTestDesign, onOpenAutomationAi, theme, onToggleTheme }: LearnHubProps) {
  const openGuide = (guide: 'automation-ai' | 'test-design' | 'api-testing' | 'rag-training') => {
    if (guide === 'automation-ai') onOpenAutomationAi()
    if (guide === 'test-design') onOpenTestDesign()
    if (guide === 'api-testing') onOpenApiGuide()
    if (guide === 'rag-training') onOpenRagTraining()
  }
  const jumpToKnowledge = () => document.getElementById('knowledge-base')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return <main className="learn-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo onHome={onClose} /><div className="hub-nav-actions"><ThemeToggle theme={theme} onToggle={onToggleTheme} /><button type="button" onClick={onClose}>← Back to home</button></div></header>
    <section className="learn-hero"><p className="eyebrow">LEARN</p><h1>Quality starts<br />before <em>testing.</em></h1><p>Build a clear picture of what QA is, where it belongs in the delivery process, and what to explore next.</p><a href="#what-is-qa" onClick={(event) => { event.preventDefault(); document.getElementById('what-is-qa')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>Start with QA <span>↓</span></a></section>
    <div className="learning-utility-grid">
      <LearningSearch onOpenGuide={openGuide} onOpenPractice={onOpenPractice} onOpenToolkits={onOpenTools} onJumpToKnowledge={jumpToKnowledge} />
      <LearningProgress onOpenGuide={openGuide} />
    </div>

    <section className="learn-section" id="what-is-qa"><p className="eyebrow">01 · WHAT IS QA?</p><div className="learn-split"><div><h2>QA helps teams<br />build software<br /><em>people can trust.</em></h2></div><div><p>Quality assurance is the practice of reducing avoidable surprises. It is not limited to finding bugs at the end of a project—it is the habit of asking better questions throughout the work.</p><div className="qa-principles"><article><span>USER</span><h3>Protect the experience</h3><p>Consider real people, real conditions, and the moments that make a feature confusing or inaccessible.</p></article><article><span>RISK</span><h3>Focus attention wisely</h3><p>Not every path carries the same impact. QA helps a team decide what deserves the most confidence first.</p></article><article><span>LEARNING</span><h3>Make feedback useful</h3><p>Good checks, defects, and release notes help the next person understand what happened and what to do next.</p></article></div></div></div></section>

    <LearningLevels onOpenTools={onOpenTools} />
    <LearningPaths />
    <KnowledgeBase onOpenPractice={onOpenPractice} onOpenToolkits={onOpenTools} onOpenApiGuide={onOpenApiGuide} onOpenTestDesign={onOpenTestDesign} onOpenAutomationAi={onOpenAutomationAi} />
    <section className="field-guides" aria-labelledby="field-guides-title"><div className="field-guides-heading"><div><p className="eyebrow">FIELD GUIDES</p><h2 id="field-guides-title">Short lessons for<br /><em>practical QA work.</em></h2></div><p>Open one focused guide at a time. Each has short lessons, examples, visual explainers, and a return path to Learn.</p></div><div className="field-guides-grid"><article><p className="eyebrow">AUTOMATION + AI</p><h3>Choose the right kind of help.</h3><p>Decide when to automate, use AI support, explore manually, or combine all three.</p><button type="button" onClick={onOpenAutomationAi}>Open guide <span>↗</span></button></article><article><p className="eyebrow">TEST DESIGN</p><h3>Build coverage that earns its keep.</h3><p>Use risk, boundaries, rules, states, and combinations to design useful checks.</p><button type="button" onClick={onOpenTestDesign}>Open guide <span>↗</span></button></article><article><p className="eyebrow">API TESTING</p><h3>Understand the system behind the screen.</h3><p>Learn requests, responses, validation, authorization, and safe failure behavior.</p><button type="button" onClick={onOpenApiGuide}>Open guide <span>↗</span></button></article><article><p className="eyebrow">RAG TRAINING</p><h3>Help AI answer from evidence.</h3><p>Learn retrieval, source quality, grounded answers, safety, and evaluation.</p><button type="button" onClick={onOpenRagTraining}>Open guide <span>↗</span></button></article></div></section>
    <LearningPacks />
    <section className="learn-next"><p className="eyebrow">KEEP GOING</p><h2>Choose your next<br /><em>useful step.</em></h2><p>Explore the current Automation, AI for QA, and Quality Essentials paths. Use the Knowledge Base as you learn, then take a focused idea into your next sprint.</p><div><button type="button" onClick={onOpenPractice}>Open the Practice Lab <span>↗</span></button><button type="button" className="learn-next-link" onClick={() => document.getElementById('learning-paths')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Explore learning paths <span>↗</span></button></div></section>
  </main>
}
