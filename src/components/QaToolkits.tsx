import { useMemo, useState } from 'react'

const promptLibrary = [
  ['Test planning', 'Act as a senior QA engineer. Based on this user story: [PASTE STORY], create a risk-based test approach. Include happy paths, negative paths, edge cases, accessibility checks, API concerns, and questions to clarify before testing.'],
  ['Bug investigation', 'Help me investigate this bug without guessing. Here are the observed behavior, expected behavior, environment, and reproduction steps: [PASTE DETAILS]. Suggest the most useful next checks, logs, and questions for isolating the cause.'],
  ['Release readiness', 'Create a concise release-readiness checklist for: [FEATURE / RELEASE]. Include functional coverage, regression risk, monitoring, accessibility, rollback considerations, and stakeholder communication.'],
]

export function QaToolkits() {
  const [activeTool, setActiveTool] = useState<'decision' | 'cases' | 'prompts'>('decision')
  const [answers, setAnswers] = useState([false, false, false, false])
  const [feature, setFeature] = useState('')
  const [showCases, setShowCases] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const score = answers.filter(Boolean).length
  const recommendation = useMemo(() => score >= 3 ? ['Good automation candidate', 'This flow looks repeatable, high-value, and stable enough to automate. Start with the most important path, then add coverage deliberately.'] : score === 2 ? ['Use a blended approach', 'Automate the stable, repeatable parts of this flow. Pair it with exploratory testing until the experience or risk is clearer.'] : ['Explore before you automate', 'Focus on understanding the behavior, risks, and change rate first. Automation will be more useful once the workflow is stable and understood.'], [score])
  const copyPrompt = async (label: string, text: string) => {
    await navigator.clipboard?.writeText(text)
    setCopied(label)
    window.setTimeout(() => setCopied(null), 1800)
  }
  const checklist = feature.trim() || 'this feature'

  return <section className="toolkits section" id="tools">
    <div className="section-heading"><p className="eyebrow">QA TOOLKITS</p><h2>Useful tools.<br /><em>No fluff.</em></h2><p className="section-copy">Simple helpers for making better testing decisions before you open a ticket, write a script, or start a release.</p></div>
    <div className="tool-tabs" role="tablist" aria-label="QA tools"><button type="button" className={activeTool === 'decision' ? 'active' : ''} onClick={() => setActiveTool('decision')} role="tab" aria-selected={activeTool === 'decision'}>Automation guide</button><button type="button" className={activeTool === 'cases' ? 'active' : ''} onClick={() => setActiveTool('cases')} role="tab" aria-selected={activeTool === 'cases'}>Test case starter</button><button type="button" className={activeTool === 'prompts' ? 'active' : ''} onClick={() => setActiveTool('prompts')} role="tab" aria-selected={activeTool === 'prompts'}>QA prompts</button></div>

    {activeTool === 'decision' && <div className="tool-panel"><div className="tool-panel-copy"><p className="eyebrow">AUTOMATION DECISION GUIDE</p><h3>Should this be automated?</h3><p>Answer four practical questions. This is a starting conversation—not a substitute for understanding the product.</p></div><div className="decision-card"><div className="decision-questions">{['Does the flow happen often or on every release?', 'Would a failure create meaningful user or business risk?', 'Is the expected behavior stable enough to describe clearly?', 'Can the test run without complex, fragile setup?'].map((question, index) => <label key={question}><input type="checkbox" checked={answers[index]} onChange={() => setAnswers(answers.map((answer, answerIndex) => answerIndex === index ? !answer : answer))} /><span>{question}</span><i>{answers[index] ? '✓' : '+'}</i></label>)}</div><div className="decision-result"><p className="eyebrow">RECOMMENDATION · {score}/4 SIGNALS</p><h4>{recommendation[0]}</h4><p>{recommendation[1]}</p></div></div></div>}

    {activeTool === 'cases' && <div className="tool-panel"><div className="tool-panel-copy"><p className="eyebrow">TEST CASE STARTER</p><h3>Turn a feature into test ideas.</h3><p>Describe the feature or user story. You’ll get a practical checklist to begin your own test design.</p></div><div className="case-card"><label htmlFor="feature">FEATURE OR USER STORY</label><textarea id="feature" value={feature} onChange={(event) => { setFeature(event.target.value); setShowCases(false) }} placeholder="Example: A customer can reset their password using an email link." /><button type="button" className="button primary" onClick={() => setShowCases(true)}>Generate test ideas <span aria-hidden="true">↗</span></button>{showCases && <div className="case-results"><p className="eyebrow">STARTER CHECKLIST FOR {checklist.toUpperCase()}</p><ul><li><b>Happy path:</b> Can a user complete the core workflow with valid data?</li><li><b>Negative paths:</b> What happens with missing, invalid, expired, or duplicate input?</li><li><b>Edge cases:</b> Try boundary values, interrupted sessions, and repeat attempts.</li><li><b>Accessibility:</b> Can the flow be completed with a keyboard and understood by assistive technology?</li><li><b>Integration:</b> What data, API responses, emails, or permissions could affect the result?</li></ul></div>}</div></div>}

    {activeTool === 'prompts' && <div className="tool-panel"><div className="tool-panel-copy"><p className="eyebrow">QA PROMPT LIBRARY</p><h3>Prompts that improve the work.</h3><p>Use these as a starting point with your AI tool of choice. Add your product context and always verify the output.</p></div><div className="prompt-list-tool">{promptLibrary.map(([label, prompt]) => <article key={label}><p>{label}</p><pre>{prompt}</pre><button type="button" onClick={() => copyPrompt(label, prompt)}>{copied === label ? 'Copied ✓' : 'Copy prompt ↗'}</button></article>)}</div></div>}
  </section>
}
