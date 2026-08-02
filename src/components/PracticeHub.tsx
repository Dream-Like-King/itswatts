import { useMemo, useState } from 'react'
import { Logo } from './Logo'
import { BugHunt } from './BugHunt'
import { AdvancedBugHunts } from './AdvancedBugHunts'
import { FixCodeChallenges } from './FixCodeChallenges'
import { ThemeToggle } from './ThemeToggle'

type PracticeHubProps = { onClose: () => void; onOpenTools: () => void; onOpenLearn: () => void; theme: 'light' | 'dark'; onToggleTheme: () => void }

const questions = [
  { question: 'How comfortable are you with common QA terms such as regression, severity, and acceptance criteria?', answers: [['I am still learning the language', 0], ['I can use them in day-to-day testing', 1], ['I use them to shape team conversations', 2]] },
  { question: 'Which statement best reflects your current testing work?', answers: [['I am learning how to explore a feature and record what I find', 0], ['I design coverage around risk, integrations, and changing behavior', 1], ['I help teams improve their quality strategy and automation approach', 2]] },
  { question: 'What would be most useful next?', answers: [['A clear foundation and small practice exercises', 0], ['Hands-on test design and automation decisions', 1], ['Systems thinking, coaching, and AI-assisted workflows', 2]] },
  { question: 'How do you decide what needs the most testing attention?', answers: [['I am learning how to spot risk and ask useful questions', 0], ['I compare user impact, change, data, and failure likelihood', 1], ['I help the team make risk visible early and use it to guide coverage', 2]] },
  { question: 'What is your current relationship with automation?', answers: [['I want to understand when automation is useful before writing scripts', 0], ['I can identify stable, repeatable checks that are worth automating', 1], ['I think about maintainability, feedback speed, and automation strategy across a team', 2]] },
  { question: 'How do you use AI in QA work today?', answers: [['I am exploring safe, practical ways to use it as a learning partner', 0], ['I use it to strengthen test ideas, documentation, or investigation questions', 1], ['I build repeatable AI-assisted workflows while keeping human judgment in the loop', 2]] },
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
  {
    title: 'New account notification',
    situation: 'A product team adds an email notification when an administrator creates a new user account.',
    choices: [
      ['Confirm that one email arrives in a test inbox', false, 'That is a helpful first check, but it does not address recipient accuracy, timing, content, or failure behavior.'],
      ['Check recipients, role and permission changes, message content, duplicate sends, links, delivery delay, and a failed email service', true, 'Great coverage. Notifications are a user-facing integration, so both content and failure behavior matter.'],
      ['Only test the notification after all other release work is complete', false, 'Notification behavior can be important to onboarding and support, so it deserves attention before release.'],
    ],
  },
  {
    title: 'Accessible confirmation dialog',
    situation: 'Deleting a saved payment method now requires a confirmation dialog before the action is final.',
    choices: [
      ['Verify the delete button removes the payment method with a mouse', false, 'The core action is important, but the dialog introduces focus, messaging, escape, and recovery behavior to explore.'],
      ['Test keyboard focus, screen-reader labels, cancel and escape behavior, repeat clicks, error recovery, and the final saved state', true, 'Strong choice. A destructive action needs clear, accessible confirmation and predictable recovery.'],
      ['Skip accessibility checks because the component comes from a design system', false, 'A design system helps, but the implementation and surrounding workflow still need real-world checks.'],
    ],
  },
  {
    title: 'Customer profile API delay',
    situation: 'A profile page now loads customer preferences from a new API that can sometimes respond slowly.',
    choices: [
      ['Approve the feature when the API responds quickly in a local environment', false, 'A fast local response does not show how the experience handles the conditions users may actually encounter.'],
      ['Check loading feedback, timeout and error states, retry behavior, stale data, partial responses, and whether the rest of the page remains usable', true, 'Exactly. This explores resilience, communication, and the user experience when a dependency is not ideal.'],
      ['Remove the loading state so the page feels simpler', false, 'A missing state may make a delayed response confusing; useful feedback builds trust.'],
    ],
  },
] as const

const templates = [
  ['Test case starter', 'Turn a feature or user story into focused coverage ideas.', '/downloads/test-case-starter.md'],
  ['Automation decision checklist', 'Decide whether a workflow is ready for automation, exploration, or both.', '/downloads/automation-decision-checklist.md'],
  ['Bug report template', 'Communicate the behavior, evidence, impact, and context clearly.', '/downloads/bug-report-template.md'],
  ['Exploratory testing charter', 'Give a time-boxed test session a purposeful mission.', '/downloads/exploratory-testing-charter.md'],
  ['Release readiness checklist', 'Prepare a short, risk-aware conversation before releasing.', '/downloads/release-readiness-checklist.md'],
  ['Playwright Demo Lab flow', 'Download a ready-to-run test that signs in, shops, applies a promo, and checks out safely.', '/downloads/demo-lab-playwright.spec.ts'],
] as const

export function PracticeHub({ onClose, onOpenTools, onOpenLearn, theme, onToggleTheme }: PracticeHubProps) {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'scenarios' | 'bug-hunt' | 'fix-code'>('roadmap')
  const [bugHuntIndex, setBugHuntIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const score = answers.reduce((total, answer) => total + answer, 0)
  const recommendation = useMemo(() => score <= 3 ? ['Beginner route', 'Start with the QA foundations, then practice describing behavior and reporting what you learn.'] : score <= 8 ? ['Intermediate route', 'Build risk-based test design, integration thinking, and confident automation decisions.'] : ['Advanced route', 'Focus on quality strategy, technical influence, and AI-assisted ways of working.'], [score])
  const scenario = scenarios[scenarioIndex]
  const bugHuntScenarios = [
    { label: 'Checkout', level: 'BEGINNER' },
    { label: 'Password recovery', level: 'INTERMEDIATE' },
    { label: 'Payment incident', level: 'ADVANCED' },
  ]
  const activeBugHunt = bugHuntScenarios[bugHuntIndex]

  return <main className="practice-hub" id="top" tabIndex={-1}>
    <header className="learn-hub-nav"><Logo onHome={onClose} /><div className="hub-nav-actions"><ThemeToggle theme={theme} onToggle={onToggleTheme} /><button type="button" onClick={onClose}>← Back to home</button></div></header>
    <section className="practice-hero"><p className="eyebrow">PRACTICE LAB</p><h1>Learn by making<br /><em>small decisions.</em></h1><p>Build confidence through short QA exercises, realistic scenarios, and reusable templates for your next sprint.</p><p>The Demo Lab is a safe, realistic storefront for hands-on testing. Sign in with demo credentials, search products, manage a cart, apply a promo code, and complete a no-payment checkout—manually or with automation.</p><div className="hero-actions"><a className="button primary" href="https://demo.itswatts.com" target="_blank" rel="noreferrer">Open the Demo Lab <span aria-hidden="true">↗</span></a></div></section>

    <div className="practice-tabs" role="tablist" aria-label="Practice Lab sections">
      <button type="button" className={activeTab === 'roadmap' ? 'active' : ''} onClick={() => setActiveTab('roadmap')} role="tab" aria-selected={activeTab === 'roadmap'}><span className="practice-tab-number">01 ·</span><span className="practice-tab-label">Your roadmap</span></button>
      <button type="button" className={activeTab === 'scenarios' ? 'active' : ''} onClick={() => setActiveTab('scenarios')} role="tab" aria-selected={activeTab === 'scenarios'}><span className="practice-tab-number">02 ·</span><span className="practice-tab-label">Practice scenarios</span></button>
      <button type="button" className={activeTab === 'bug-hunt' ? 'active' : ''} onClick={() => setActiveTab('bug-hunt')} role="tab" aria-selected={activeTab === 'bug-hunt'}><span className="practice-tab-number">03 ·</span><span className="practice-tab-label">Bug Hunt</span></button>
      <button type="button" className={activeTab === 'fix-code' ? 'active' : ''} onClick={() => setActiveTab('fix-code')} role="tab" aria-selected={activeTab === 'fix-code'}><span className="practice-tab-number">04 ·</span><span className="practice-tab-label">Fix the Code</span></button>
    </div>

    <section className="practice-content" aria-live="polite">
      {activeTab === 'roadmap' && <div className="roadmap-panel"><div><p className="eyebrow">QA ROADMAP CHECK</p><h2>Find your next<br /><em>useful step.</em></h2><p>This is not a test or a label. Choose the answers closest to where you are right now.</p></div><div className="roadmap-questions">{questions.map((item, questionIndex) => <fieldset key={item.question}><legend>{questionIndex + 1}. {item.question}</legend>{item.answers.map(([answer, value]) => <label key={answer}><input type="radio" name={`roadmap-${questionIndex}`} checked={answers[questionIndex] === value} onChange={() => setAnswers((current) => { const next = [...current]; next[questionIndex] = value; return next })} /><span>{answer}</span></label>)}</fieldset>)}</div>{answers.filter((answer) => answer !== undefined).length === questions.length && <article className="roadmap-result"><p className="eyebrow">YOUR STARTING POINT</p><h3>{recommendation[0]}</h3><p>{recommendation[1]}</p><div className="roadmap-actions"><button type="button" onClick={onOpenLearn}>View your learning route <span>↗</span></button><button type="button" onClick={onOpenTools}>Use the QA Toolkits <span>↗</span></button></div></article>}</div>}

      {activeTab === 'scenarios' && <div className="scenario-panel"><div><p className="eyebrow">PRACTICE SCENARIO · {String(scenarioIndex + 1).padStart(2, '0')}/{String(scenarios.length).padStart(2, '0')}</p><h2>{scenario.title}</h2><p>{scenario.situation}</p></div><div className="scenario-choices">{scenario.choices.map(([choice, isBest, feedback], index) => <button key={choice} type="button" className={selectedChoice === index ? (isBest ? 'correct' : 'incorrect') : ''} onClick={() => setSelectedChoice(index)}><span>{String.fromCharCode(65 + index)}</span><b>{choice}</b>{selectedChoice === index && <small>{feedback}</small>}</button>)}</div><div className="scenario-controls"><button type="button" disabled={scenarioIndex === 0} onClick={() => { setScenarioIndex((index) => index - 1); setSelectedChoice(null) }}>← Previous</button><button type="button" disabled={scenarioIndex === scenarios.length - 1} onClick={() => { setScenarioIndex((index) => index + 1); setSelectedChoice(null) }}>Next scenario →</button></div></div>}

      {activeTab === 'bug-hunt' && <div className="bug-hunt-sequence">
        <div className="bug-hunt-sequence-nav">
          <div><p className="eyebrow">BUG HUNT · {activeBugHunt.level}</p><p>Test {String(bugHuntIndex + 1).padStart(2, '0')}/{String(bugHuntScenarios.length).padStart(2, '0')} · {activeBugHunt.label}</p></div>
          <div className="bug-hunt-sequence-controls"><button type="button" disabled={bugHuntIndex === 0} onClick={() => setBugHuntIndex((index) => index - 1)}>← Previous</button><button type="button" disabled={bugHuntIndex === bugHuntScenarios.length - 1} onClick={() => setBugHuntIndex((index) => index + 1)}>Next test →</button></div>
        </div>
        {bugHuntIndex === 0 ? <BugHunt /> : <AdvancedBugHunts key={bugHuntIndex} challengeIndex={bugHuntIndex - 1} />}
      </div>}
      {activeTab === 'fix-code' && <FixCodeChallenges />}
    </section>

    <section className="practice-resources" id="practice-resources"><div><p className="eyebrow">PRACTICE RESOURCES</p><h2>Take the work<br /><em>with you.</em></h2><p>Download, adapt, and improve these starters for your own product and team.</p></div><div className="template-list">{templates.map(([title, copy, href], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div><a href={href} download>Download <b aria-hidden="true">↧</b></a></article>)}</div></section>
  </main>
}
