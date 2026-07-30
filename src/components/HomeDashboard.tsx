type HomeDashboardProps = { onOpenLearn: () => void; onOpenPractice: () => void; onOpenToolkits: () => void; onOpenCareer: () => void }

const nextSteps = [
  ['01', 'Learn Hub', 'Build a clear foundation in QA, the SDLC, terms, career paths, and practical next steps.', 'Open Learn Hub'],
  ['02', 'Practice Lab', 'Check your starting point, work through realistic QA scenarios, and take templates with you.', 'Open Practice Lab'],
  ['03', 'QA Toolkits', 'Use the Automation Guide, Test Case Starter, and QA Prompt Library for the work in front of you.', 'Open Toolkits'],
  ['04', 'Career paths', 'Explore QA Analyst, Automation QA, and quality-engineering routes with practical starting guidance.', 'Explore paths'],
] as const

export function HomeDashboard({ onOpenLearn, onOpenPractice, onOpenToolkits, onOpenCareer }: HomeDashboardProps) {
  const actions = [onOpenLearn, onOpenPractice, onOpenToolkits, onOpenCareer]
  return <section className="home-dashboard section" id="about">
    <div className="dashboard-heading"><p className="eyebrow">START HERE</p><h2>Choose one<br /><em>useful next step.</em></h2><p>It’s Watts turns real quality-engineering practice into approachable lessons, tools, and experiments you can use in your next sprint.</p></div>
    <div className="dashboard-grid">{nextSteps.map(([number, title, copy, action], index) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p><button type="button" onClick={actions[index]}>{action} <b aria-hidden="true">↗</b></button></article>)}</div>
  </section>
}
