import { useMemo, useState } from 'react'
import { explorationTools } from '../data/site'

const categories = ['All', 'Automation', 'AI + QA', 'Delivery + SDLC'] as const
type Category = typeof categories[number]

const toolNotes: Record<string, { bestFor: string; check: string; limit: string }> = {
  Playwright: { bestFor: 'Stable, high-value browser journeys across major browsers.', check: 'Use role- and label-based locators, isolated data, and user-visible assertions.', limit: 'It cannot replace exploratory testing or prove every behavior is correct.' },
  Selenium: { bestFor: 'Established multi-language suites and teams using browser grids.', check: 'Keep waits intentional and helpers small enough to understand.', limit: 'A large suite still needs useful test selection and maintenance time.' },
  Cypress: { bestFor: 'Fast front-end feedback and debugging for web applications.', check: 'Test user outcomes and control network responses only when the scenario requires it.', limit: 'It does not remove the need to test real integrations and supported browsers.' },
  Postman: { bestFor: 'Exploring an API contract before automating key checks.', check: 'Verify method, auth, headers, status, body, errors, and boundary data.', limit: 'A successful request alone does not prove the full user journey works.' },
  'REST Assured': { bestFor: 'Java teams that want API checks in the application test pipeline.', check: 'Make request setup readable and assert the contract, not only a status code.', limit: 'Service tests cannot show whether the screen communicates an error clearly.' },
  'Browser DevTools': { bestFor: 'Investigating defects, network failures, layout issues, and browser state.', check: 'Compare requests, responses, console errors, storage, and rendered accessibility information.', limit: 'An observation is evidence—not a substitute for a reproducible defect report.' },
  'GitHub Copilot': { bestFor: 'Drafting test helpers, explaining code, and proposing first-pass test ideas.', check: 'Review selectors, assumptions, generated data, and meaningful outcomes.', limit: 'It does not know product rules unless you provide them.' },
  ChatGPT: { bestFor: 'Expanding requirements into questions, risks, and candidate scenarios.', check: 'Give it the user goal, criteria, constraints, and known risks.', limit: 'Generated ideas need product validation before they become a test plan.' },
  Promptfoo: { bestFor: 'Repeatable evaluation and red-teaming of LLM prompts and responses.', check: 'Use representative inputs, expected qualities, adversarial cases, and human review.', limit: 'A passing evaluation set is not a guarantee an AI feature is safe or accurate.' },
  'Azure DevOps': { bestFor: 'Connecting planning, code, defects, evidence, and release work.', check: 'Link the story, test evidence, defect impact, and release decision where useful.', limit: 'A ticket workflow cannot replace a quality conversation.' },
  Jira: { bestFor: 'Making requirements, defects, decisions, and risk visible to a delivery team.', check: 'Write acceptance criteria, reproduction details, impact, and ownership clearly.', limit: 'A well-written issue is only as useful as the follow-up it enables.' },
  'Git & GitHub': { bestFor: 'Versioning automation assets, reviewing changes, and collaborating on test code.', check: 'Use small commits, meaningful reviews, and CI feedback tied to a change.', limit: 'Source control does not make a brittle test reliable by itself.' },
  'GitHub Actions': { bestFor: 'Running focused checks when a pull request or deployment changes.', check: 'Start with fast, trustworthy feedback and publish useful failure artifacts.', limit: 'Running every test on every change can slow delivery without adding confidence.' },
  TestRail: { bestFor: 'Organizing planned coverage, execution evidence, and release readiness.', check: 'Keep cases focused on risk and outcomes; retire coverage that no longer helps.', limit: 'Recorded cases do not replace active exploration of new risk.' },
  'axe DevTools': { bestFor: 'Finding common accessibility issues early in development and QA.', check: 'Pair it with keyboard flow, focus, labels, zoom, and assistive-tech checks.', limit: 'Automated checks catch only a portion of accessibility barriers.' },
}

export function FocusTools() {
  const [category, setCategory] = useState<Category>('All')
  const [selectedName, setSelectedName] = useState('Playwright')
  const visibleTools = useMemo(() => category === 'All' ? explorationTools : explorationTools.filter((tool) => tool.category === category), [category])
  const selected = explorationTools.find((tool) => tool.name === selectedName) ?? explorationTools[0]
  const note = toolNotes[selected.name]

  return <section className="focus-tools section" id="focus-tools">
    <div className="focus-tools-heading"><p className="eyebrow">QA SOFTWARE GUIDE</p><h2>Software for<br /><em>quality work.</em></h2><p>Select a tool or platform to see how it can support thoughtful QA work across a delivery cycle.</p></div>
    <div className="focus-tools-main">
      <div className="focus-tool-filters" role="group" aria-label="Filter tools by category">{categories.map((item) => <button type="button" key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div>
      <div className="focus-tool-list" aria-label="Tool list">{visibleTools.map((tool) => <button type="button" key={tool.name} className={selected.name === tool.name ? 'active' : ''} onClick={() => setSelectedName(tool.name)}><span>{tool.category}</span>{tool.name}<b aria-hidden="true">↗</b></button>)}</div>
      <article className="focus-tool-detail" aria-live="polite"><p className="eyebrow">{selected.category.toUpperCase()}</p><h3>{selected.name}</h3><p>{selected.description}</p><div><b>Everyday QA use</b><span>{selected.use}</span></div><section className="tool-subject-notes" aria-label={`${selected.name} practical guidance`}><article><b>Best for</b><p>{note.bestFor}</p></article><article><b>What to check</b><p>{note.check}</p></article><article><b>Keep in mind</b><p>{note.limit}</p></article></section></article>
    </div>
  </section>
}
