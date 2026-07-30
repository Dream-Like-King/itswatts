import { useMemo, useState } from 'react'
import { Logo } from './Logo'

type PracticeHubProps = { onClose: () => void; onOpenTools: () => void }

const questions = [
  { question: 'How comfortable are you with common QA terms such as regression, severity, and acceptance criteria?', answers: [['I am still learning the language', 0], ['I can use them in day-to-day testing', 1], ['I use them to shape team conversations', 2]] },
  { question: 'Which statement best reflects your current testing work?', answers: [['I am learning how to explore a feature and record what I find', 0], ['I design coverage around risk, integrations, and changing behavior', 1], ['I help teams improve their quality strategy and automation approach', 2]] },
  { question: 'What would be most useful next?', answers: [['A clear foundation and small practice exercises', 0], ['Hands-on test design and automation decisions', 1], ['Systems thinking, coaching, and AI-assisted workflows', 2]] },
] as const

const scenarios = [
  {
    title: 'Password reset',
    situation: 'A password-reset feature works in a demo. The team plans to release it tomorrow.',
    choices: [
      ['Check the happy path once and approve it', false, 'A demo is useful, but it does not reveal important failure, security, or recovery behavior.'],
      ['Explore expiry, invalid or reused links, error messages, keyboard use, and account/session safety', true, 'Strong start. This targets the riskier behavior around a common account flow.'],
      ['Wait for production feedback before testing edge cases', false, 'Production feedback can help, but these risks are practical to investigate before release.'],
    ],
  },
  {
    title: 'Checkout change',
    situation: 'A checkout update adds a discount code field and changes the total shown to customers.',
    choices: [
      ['Focus on whether the field appears on the page', false, 'Visual presence matters, but transaction behavior and communication matter more here.'],
      ['Check valid, invalid, expired, and repeated codes; totals; failed payments; and the confirmation record', true, 'Exactly. This covers both customer impact and transaction integrity.'],
      ['Automate every possible combination before the release', false, 'Start with the highest-risk behavior. Broad automation can come after the workflow is understood and stable.'],
    ],
  },
] as const

const templates = [
  ['Test case starter', 'Turn a feature or user story into focused coverage ideas.', '/downloads/test-case-starter.md'],
  ['Automation decision checklist', 'Decide whether a workflow is ready for automation, exploration, or both.', '/downloads/automation-decision-checklist.md'],
  ['Bug report template', 'Communicate the behavior, evidence, impact, and context clearly.', '/downloads/bug-report-template.md'],
  ['Exploratory testing charter', 'Give a time-boxed test session a purposeful mission.', '/downloads/exploratory-testing-charter.md'],
  ['Release readiness checklist', 'Prepare a short, risk-aware conversation before releasing.', '/downloads/release-readiness-checklist.md'],
] as const

export function PracticeHub({ onClose, onOpenTools }: PracticeHubProps) {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'scenarios' | 'templates'>('roadmap')
  const [answers, setAnswers] = useState<number[]>([])
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const score = answers.reduce((total, answer) => total + answer, 0)
  const recommendation = useMemo(() => score <= 1 ? ['Beginner route', 'Start with the QA foundations, then practice describing behavior and reporting what you learn.'] : score <= 4 ? ['Intermediate route', 'Build risk-based test design, integration thinking, and confident automation decisions.'] : ['Advanced route', 'Focus on quality strategy, technical influence, and AI-assisted ways of working.'], [score])
  const scenario = scenarios[scenarioIndex]

  return <main className="practice-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo /><button type="button" onClick={onClose}>← Back to home</button></header>
    <section className="practice-hero"><p className="eyebrow">PRACTICE LAB</p><h1>Learn by making<br /><em>small decisions.</em></h1><p>Try a short roadmap check, work through realistic QA situations, and take a useful template into your next sprint.</p></section>

    <div className="practice-tabs" role="tablist" aria-label="Practice Lab sections">
      <button type="button" className={activeTab === 'roadmap' ? 'active' : ''} onClick={() => setActiveTab('roadmap')} role="tab" aria-selected={activeTab === 'roadmap'}>01 · Your roadmap</button>
      <button type="button" className={activeTab === 'scenarios' ? 'active' : ''} onClick={() => setActiveTab('scenarios')} role="tab" aria-selected={activeTab === 'scenarios'}>02 · Practice scenarios</button>
      <button type="button" className={activeTab === 'templates' ? 'active' : ''} onClick={() => setActiveTab('templates')} role="tab" aria-selected={activeTab === 'templates'}>03 · Templates</button>
    </div>

    <section className="practice-content" aria-live="polite">
      {activeTab === 'roadmap' && <div className="roadmap-panel"><div><p className="eyebrow">QA ROADMAP CHECK</p><h2>Find your next<br /><em>useful step.</em></h2><p>This is not a test or a label. Choose the answers closest to where you are right now.</p></div><div className="roadmap-questions">{questions.map((item, questionIndex) => <fieldset key={item.question}><legend>{questionIndex + 1}. {item.question}</legend>{item.answers.map(([answer, value]) => <label key={answer}><input type="radio" name={`roadmap-${questionIndex}`} checked={answers[questionIndex] === value} onChange={() => setAnswers((current) => { const next = [...current]; next[questionIndex] = value; return next })} /><span>{answer}</span></label>)}</fieldset>)}</div>{answers.length === questions.length && answers.every((answer) => answer !== undefined) && <article className="roadmap-result"><p className="eyebrow">YOUR STARTING POINT</p><h3>{recommendation[0]}</h3><p>{recommendation[1]}</p><button type="button" onClick={onOpenTools}>Use the QA Toolkits <span>↗</span></button></article>}</div>}

      {activeTab === 'scenarios' && <div className="scenario-panel"><div><p className="eyebrow">PRACTICE SCENARIO · {String(scenarioIndex + 1).padStart(2, '0')}/{String(scenarios.length).padStart(2, '0')}</p><h2>{scenario.title}</h2><p>{scenario.situation}</p></div><div className="scenario-choices">{scenario.choices.map(([choice, isBest, feedback], index) => <button key={choice} type="button" className={selectedChoice === index ? (isBest ? 'correct' : 'incorrect') : ''} onClick={() => setSelectedChoice(index)}><span>{String.fromCharCode(65 + index)}</span><b>{choice}</b>{selectedChoice === index && <small>{feedback}</small>}</button>)}</div><div className="scenario-controls"><button type="button" disabled={scenarioIndex === 0} onClick={() => { setScenarioIndex((index) => index - 1); setSelectedChoice(null) }}>← Previous</button><button type="button" disabled={scenarioIndex === scenarios.length - 1} onClick={() => { setScenarioIndex((index) => index + 1); setSelectedChoice(null) }}>Next scenario →</button></div></div>}

      {activeTab === 'templates' && <div className="template-panel"><div><p className="eyebrow">TAKE THE WORK WITH YOU</p><h2>Simple templates.<br /><em>Useful structure.</em></h2><p>Download, adapt, and improve these starters for your own product and team.</p></div><div className="template-list">{templates.map(([title, copy, href], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div><a href={href} download>Download <b aria-hidden="true">↧</b></a></article>)}</div></div>}
    </section>
  </main>
}
