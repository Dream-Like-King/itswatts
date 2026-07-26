import { Navbar } from './components/Navbar'
import { SectionHeading } from './components/SectionHeading'
import { AskWatt } from './components/AskWatt'
import { Logo } from './components/Logo'
import { labItems, projects, skills } from './data/site'

function App() {
  return <main id="top">
    <div className="hero-glow"></div><Navbar />
    <section className="hero">
      <div className="hero-grid" aria-hidden="true"></div><div className="orb orb-one"></div><div className="orb orb-two"></div>
      <div className="hero-content"><p className="eyebrow hero-eyebrow"><span></span> QUALITY ENGINEERING + AI</p><h1>Smarter answers.<br /><em>Better software.</em></h1><p className="hero-copy">It’s Watt is where quality engineering, automation, and AI come together to make technology more useful.</p><div className="hero-actions"><a className="button primary" href="#ask-watt">Ask Watt <span>↗</span></a><a className="button quiet" href="#work">Explore the work <span>↓</span></a></div></div>
      <div className="hero-footer"><span>BASED IN THE DETAILS. BUILT FOR WHAT’S NEXT.</span><span className="scroll-mark">SCROLL TO EXPLORE <i></i></span></div>
    </section>

    <section className="intro section" id="about"><p className="eyebrow">WHAT IS IT’S WATT?</p><div><h2>More than a portfolio.<br />A <em>living lab</em> for better<br />digital experiences.</h2><p>Built by Derrick Watson, It’s Watt brings together thoughtful quality engineering and curious experimentation—because great software should feel intentional from the inside out.</p><a className="text-link" href="#contact">A little about Derrick <span>↗</span></a></div></section>

    <section className="capabilities section"><SectionHeading eyebrow="THE FOCUS" title="Quality that moves with you." copy="From the first question to the final release, every practice has one purpose: helping teams build with confidence." /><div className="skills-grid">{skills.map((skill) => <article className="skill-card" key={skill.number}><span>{skill.number}</span><div className="plus">+</div><h3>{skill.title}</h3><p>{skill.text}</p></article>)}</div></section>

    <section className="work section" id="work"><SectionHeading eyebrow="SELECTED WORK" title="The work behind the watt." /><div className="projects-grid">{projects.map((project, index) => <article className={`project project-${index + 1}`} key={project.title}><div className="project-art"><div className="art-mark">{index === 0 ? '↗' : index === 1 ? 'ϟ' : '◎'}</div></div><div className="project-content"><p>{project.tag}</p><h3>{project.title}</h3><div><span>{project.description}</span><a href="#contact" aria-label={project.action}>↗</a></div></div></article>)}</div><a className="button outline" href="#contact">View all projects <span>↗</span></a></section>

    <AskWatt />

    <section className="labs section" id="labs"><SectionHeading eyebrow="IN THE LAB" title="Experiments with an edge." copy="Small, useful ideas where QA, accessibility, and AI have room to meet." /><div className="labs-list">{labItems.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><a href="#contact">↗</a></article>)}</div></section>

    <section className="contact section" id="contact"><p className="eyebrow">LET’S MAKE SOMETHING BETTER</p><h2>Have a question,<br />project, or <em>bright idea?</em></h2><a href="mailto:hello@itswatt.com" className="contact-email">hello@itswatt.com <span>↗</span></a></section>
    <footer><Logo compact /><p>© {new Date().getFullYear()} It’s Watt. Built with intent.</p><div><a href="#top">Back to top ↑</a><a href="https://github.com/Dream-Like-King" target="_blank" rel="noreferrer">GitHub ↗</a></div></footer>
  </main>
}
export default App
