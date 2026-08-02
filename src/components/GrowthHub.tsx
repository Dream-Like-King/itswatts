import { useState } from 'react'
import type { FormEvent } from 'react'

const downloads = [
  ['QA test case starter', 'A structured template for turning a feature into clear, useful test coverage.', '/downloads/test-case-starter.md'],
  ['Automation decision checklist', 'A quick guide for choosing automation, exploration, or a blended approach.', '/downloads/automation-decision-checklist.md'],
  ['Bug report template', 'A practical structure for creating defect reports that move work forward.', '/downloads/bug-report-template.md'],
]

const queue = [
  ['01', 'How I think about accessibility during QA', 'QUALITY ESSENTIALS'],
  ['02', 'A beginner-friendly Playwright test, explained', 'AUTOMATION'],
  ['03', 'Five ways AI can improve your test planning', 'AI + QA'],
  ['04', 'What makes a regression suite trustworthy?', 'AUTOMATION'],
  ['05', 'How to ask better questions during requirements review', 'QUALITY ESSENTIALS'],
  ['06', 'AI-generated test cases: what to verify before you trust them', 'AI + QA'],
]

export function GrowthHub() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const joinList = (event: FormEvent) => {
    event.preventDefault()
    const value = email.trim()
    if (!value || !value.includes('@')) { setMessage('Enter a valid email address to join the launch list.'); return }
    setMessage('Your email app will open so you can confirm your place on the launch list.')
    window.location.href = `mailto:watson.derrick@outlook.com?subject=${encodeURIComponent('it’s Wattϟ launch list')}&body=${encodeURIComponent(`Please add ${value} to the it’s Wattϟ launch list.`)}`
  }
  return <>
    <section className="downloads section" id="downloads"><div className="section-heading"><p className="eyebrow">FREE STARTERS</p><h2>Take the next<br /><em>useful step.</em></h2><p className="section-copy">Three lightweight templates for your next feature review, automation conversation, or defect report.</p></div><div className="download-grid">{downloads.map(([title, copy, file]) => <article key={title}><span>↓</span><h3>{title}</h3><p>{copy}</p><a href={file} download>Download template <b>↧</b></a></article>)}</div></section>
    <section className="queue section"><div className="section-heading"><p className="eyebrow">COMING UP</p><h2>The next six<br /><em>Weekly Notes.</em></h2><p className="section-copy">A visible content queue makes the learning journey predictable—without locking you into a rigid schedule.</p></div><div className="queue-list">{queue.map(([number, title, category]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{category}</p></article>)}</div></section>
    <section className="subscribe section" id="subscribe"><div><p className="eyebrow">STAY IN THE LOOP</p><h2>One good QA idea<br />at a <em>time.</em></h2><p>Join the launch list for new Weekly Notes, useful templates, and future QA tools.</p></div><form onSubmit={joinList}><label htmlFor="subscriber-email">EMAIL ADDRESS</label><div><input id="subscriber-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /><button type="submit">Join list ↗</button></div>{message && <p className="subscribe-message" role="status">{message}</p>}<small>This opens your email app to confirm the request. A full newsletter signup is coming later.</small></form></section>
  </>
}
