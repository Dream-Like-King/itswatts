import { useState } from 'react'

const careers = [
  { number: '01', role: 'QA Analyst', summary: 'Build dependable testing habits and learn how to communicate useful product feedback.', skills: ['Exploratory testing', 'Test cases', 'Defect reporting', 'Accessibility basics'], practice: 'Choose a familiar app, write a short test charter, and turn one observed issue into a clear defect report.' },
  { number: '02', role: 'Automation QA', summary: 'Add repeatable checks without losing the human investigation that finds unfamiliar risks.', skills: ['Risk-based coverage', 'UI or API automation', 'Test data', 'CI feedback'], practice: 'Automate one stable, high-value flow. Keep the test readable enough that another person can explain its purpose.' },
  { number: '03', role: 'Quality Engineer / SDET', summary: 'Influence quality across systems, delivery practices, and team decision-making.', skills: ['Quality strategy', 'Automation architecture', 'Observability', 'Coaching and collaboration'], practice: 'Map a product risk from discovery to production, then suggest one change that makes it easier to test or monitor.' },
] as const

type CareerPathsProps = { onOpenResources: () => void }

export function CareerPaths({ onOpenResources }: CareerPathsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [showCertifications, setShowCertifications] = useState(false)
  const selected = careers[selectedIndex]

  return <section className="learn-section career-paths" id="career-paths">
    <p className="eyebrow">CHOOSE A DIRECTION</p>
    <div className="level-heading"><h2>Find the work<br />you want to <em>grow into.</em></h2><p>Roles and titles differ from team to team. Use these paths as a way to choose skills to develop, not as a single required route.</p></div>
    <div className="career-grid">{careers.map((career, index) => <button key={career.role} type="button" className={selectedIndex === index ? 'active' : ''} onClick={() => { setSelectedIndex(index); setShowDetails(false) }} aria-pressed={selectedIndex === index}><span>{career.number}</span><h3>{career.role}</h3><p>{career.summary}</p></button>)}</div>
    <div className="career-actions"><button type="button" className="button outline" onClick={() => setShowDetails((current) => !current)} aria-expanded={showDetails}>{showDetails ? 'Hide path details' : `View ${selected.role} details`} <span aria-hidden="true">↗</span></button></div>
    {showDetails && <article className="career-detail" aria-live="polite"><p className="eyebrow">{selected.number} · {selected.role.toUpperCase()}</p><h3>Build toward the work you want to do.</h3><p>{selected.practice}</p><div>{selected.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>}

    <div className="career-actions certifications-action"><button type="button" className="button outline" onClick={() => setShowCertifications((current) => !current)} aria-expanded={showCertifications}>{showCertifications ? 'Hide certification guidance' : 'Explore helpful certifications'} <span aria-hidden="true">↗</span></button></div>
    {showCertifications && <div className="certification-guidance"><div><p className="eyebrow">HELPFUL CERTIFICATIONS</p><h3>Useful evidence, never a substitute for the work.</h3><p>Credentials can give you structure and shared language. They do not replace thoughtful testing, communication, product knowledge, or hands-on practice.</p></div><div className="certification-list"><article><h4>Foundation testing</h4><p>The ISTQB Foundation Level is a commonly recognized option for learning core testing concepts and vocabulary.</p><a href="https://www.istqb.org/certifications/" target="_blank" rel="noreferrer">Visit ISTQB <span>↗</span></a></article><article><h4>Accessibility knowledge</h4><p>Consider accessibility-focused learning when inclusive design and testing are part of the work you want to do. Review current official requirements before choosing a credential.</p></article><article><h4>Tool-specific learning</h4><p>Use vendor or community training to deepen a tool such as Playwright, API testing, or CI - then prove the skill with a small, explainable project.</p></article></div></div>}

    <section className="orientation-guide"><p className="eyebrow">FREE DOWNLOAD</p><h3>New to QA? Start with a practical <em>orientation guide.</em></h3><p>A concise guide to QA terms, a 30-day starting plan, tools to explore, practice ideas, and a clear reminder that progress comes from doing the work.</p><div><a className="button primary" href="/downloads/its-watts-qa-orientation-guide.pdf" download>Download the guide <span>↧</span></a><button type="button" onClick={onOpenResources}>Explore templates <span>↗</span></button></div></section>
  </section>
}
