import { useMemo, useState } from 'react'

const promptLibrary = [
  ['Test planning', 'Act as a senior QA engineer. Based on this user story: [PASTE STORY], create a risk-based test approach. Include happy paths, negative paths, edge cases, accessibility checks, API concerns, and questions to clarify before testing.'],
  ['Bug investigation', 'Help me investigate this bug without guessing. Here are the observed behavior, expected behavior, environment, and reproduction steps: [PASTE DETAILS]. Suggest the most useful next checks, logs, and questions for isolating the cause.'],
  ['Release readiness', 'Create a concise release-readiness checklist for: [FEATURE / RELEASE]. Include functional coverage, regression risk, monitoring, accessibility, rollback considerations, and stakeholder communication.'],
]

type TestIdea = { label: string; text: string }

function buildTestIdeas(description: string): TestIdea[] {
  const featureName = description.replace(/\s+/g, ' ').trim().replace(/[.?!]+$/, '').slice(0, 120) || 'this feature'
  const normalized = description.toLowerCase()
  const ideas: TestIdea[] = [
    { label: 'Core journey', text: `Verify that a user can complete “${featureName}” with valid data and receives a clear success state.` },
    { label: 'Validation', text: `Identify the required information and test missing, malformed, duplicate, and boundary-value input for “${featureName}.”` },
    { label: 'Recovery', text: `Interrupt the flow with a refresh, back navigation, timeout, or repeat attempt. Confirm that “${featureName}” handles recovery without lost, duplicated, or misleading data.` },
    { label: 'Accessibility', text: `Complete “${featureName}” using only a keyboard. Check focus order, labels, error messaging, and status updates.` },
  ]

  if (/(password|login|sign in|authentication|account)/.test(normalized)) {
    ideas.push({ label: 'Account safety', text: 'Check expired or reused links, invalid credentials, lockout behavior, session changes, and whether sensitive details stay hidden.' })
  } else if (/(payment|checkout|order|purchase|invoice|cart)/.test(normalized)) {
    ideas.push({ label: 'Transaction integrity', text: 'Check amounts, tax or discounts, failed payments, duplicate submission, confirmation details, and the resulting order state.' })
  } else if (/(email|notification|message|alert)/.test(normalized)) {
    ideas.push({ label: 'Delivery and content', text: 'Check who receives the message, timing, duplicate sends, content accuracy, links, and behavior when delivery fails.' })
  } else if (/(upload|file|attachment|document|image)/.test(normalized)) {
    ideas.push({ label: 'File handling', text: 'Check supported formats, empty or oversized files, interrupted uploads, duplicate files, progress feedback, and safe error recovery.' })
  } else if (/(search|filter|sort|list|dashboard)/.test(normalized)) {
    ideas.push({ label: 'Data behavior', text: 'Check empty results, partial matches, special characters, pagination, sorting consistency, and whether filters persist when the user returns.' })
  } else {
    ideas.push({ label: 'Dependencies', text: `List the APIs, permissions, emails, or saved data that support “${featureName}.” Test success, delay, and failure responses for each.` })
  }

  return ideas
}

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
  const testIdeas = useMemo(() => buildTestIdeas(checklist), [checklist])

  return <section className="toolkits section" id="tools">
    <div className="section-heading"><p className="eyebrow">QA TOOLKITS</p><h2>Useful tools.<br /><em>No fluff.</em></h2><p className="section-copy">Simple helpers for making better testing decisions before you open a ticket, write a script, or start a release.</p></div>
    <div className="tool-tabs" role="tablist" aria-label="QA tools"><button type="button" className={activeTool === 'decision' ? 'active' : ''} onClick={() => setActiveTool('decision')} role="tab" aria-selected={activeTool === 'decision'}>Automation guide</button><button type="button" className={activeTool === 'cases' ? 'active' : ''} onClick={() => setActiveTool('cases')} role="tab" aria-selected={activeTool === 'cases'}>Test case starter</button><button type="button" className={activeTool === 'prompts' ? 'active' : ''} onClick={() => setActiveTool('prompts')} role="tab" aria-selected={activeTool === 'prompts'}>QA prompts</button></div>

    {activeTool === 'decision' && <div className="tool-panel"><div className="tool-panel-copy"><p className="eyebrow">AUTOMATION DECISION GUIDE</p><h3>Should this be automated?</h3><p>Answer four practical questions. This is a starting conversation—not a substitute for understanding the product.</p></div><div className="decision-card"><div className="decision-questions">{['Does the flow happen often or on every release?', 'Would a failure create meaningful user or business risk?', 'Is the expected behavior stable enough to describe clearly?', 'Can the test run without complex, fragile setup?'].map((question, index) => <label key={question}><input type="checkbox" checked={answers[index]} onChange={() => setAnswers(answers.map((answer, answerIndex) => answerIndex === index ? !answer : answer))} /><span>{question}</span><i>{answers[index] ? '✓' : '+'}</i></label>)}</div><div className="decision-result"><p className="eyebrow">RECOMMENDATION · {score}/4 SIGNALS</p><h4>{recommendation[0]}</h4><p>{recommendation[1]}</p></div></div></div>}

    {activeTool === 'cases' && <div className="tool-panel"><div className="tool-panel-copy"><p className="eyebrow">TEST CASE STARTER</p><h3>Turn a feature into test ideas.</h3><p>Describe the feature or user story. You’ll get a practical checklist to begin your own test design.</p></div><div className="case-card"><label htmlFor="feature">FEATURE OR USER STORY</label><textarea id="feature" value={feature} onChange={(event) => { setFeature(event.target.value); setShowCases(false) }} placeholder="Example: A customer can reset their password using an email link." /><button type="button" className="button primary" onClick={() => setShowCases(true)}>Generate test ideas <span aria-hidden="true">↗</span></button>{showCases && <div className="case-results"><p className="eyebrow">STARTER CHECKLIST FOR {checklist.toUpperCase()}</p><ul>{testIdeas.map((idea) => <li key={idea.label}><b>{idea.label}:</b> {idea.text}</li>)}</ul></div>}</div></div>}

    {activeTool === 'prompts' && <div className="tool-panel"><div className="tool-panel-copy"><p className="eyebrow">QA PROMPT LIBRARY</p><h3>Prompts that improve the work.</h3><p>Use these as a starting point with your AI tool of choice. Add your product context and always verify the output.</p></div><div className="prompt-list-tool">{promptLibrary.map(([label, prompt]) => <article key={label}><p>{label}</p><pre>{prompt}</pre><button type="button" onClick={() => copyPrompt(label, prompt)}>{copied === label ? 'Copied ✓' : 'Copy prompt ↗'}</button></article>)}</div></div>}
  </section>
}
