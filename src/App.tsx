import { Navbar } from './components/Navbar'
import { SectionHeading } from './components/SectionHeading'
import { AskWatt } from './components/AskWatt'
import { WeeklyNotes } from './components/WeeklyNotes'
import { Logo } from './components/Logo'
import { focusAreas, learningPaths, toolkits } from './data/site'

function App() {
  return <main id="top">
    <div className="hero-glow"></div><Navbar />
    <section className="hero education-hero">
      <div className="hero-grid" aria-hidden="true"></div><div className="orb orb-one"></div><div className="orb orb-two"></div>
      <div className="hero-content"><p className="eyebrow hero-eyebrow"><span></span> AUTOMATION · AI · QUALITY ENGINEERING</p><h1>Practical QA education<br />for the <em>AI era.</em></h1><p className="hero-copy">Learn the testing habits, automation patterns, and AI workflows that help you build software people can trust.</p><div className="hero-actions"><a className="button primary" href="#learn">Start learning <span>↓</span></a><a className="button quiet" href="#weekly">Read weekly notes <span>↗</span></a></div></div>
      <div className="hero-footer"><span>LEARN IN PUBLIC. TEST WITH PURPOSE.</span><span className="scroll-mark">EXPLORE THE HUB <i></i></span></div>
    </section>

    <section className="intro section" id="about"><p className="eyebrow">WELCOME TO IT’S WATT</p><div><h2>A QA learning hub<br />for <em>builders who care.</em></h2><p>It’s Watt turns real quality-engineering practice into approachable lessons, tools, and experiments. Whether you are starting in QA or leveling up your automation skills, you’ll find practical guidance you can use in your next sprint.</p><a className="text-link" href="#weekly">Follow the weekly notes <span>↓</span></a></div></section>

    <section className="capabilities section" id="learn"><SectionHeading eyebrow="START HERE" title="Build your QA foundation." copy="Clear learning paths for the skills that matter most in modern quality engineering." /><div className="learning-grid">{learningPaths.map((path) => <article className="learning-card" key={path.number}><span>{path.number}</span><div className="plus">+</div><h3>{path.title}</h3><p>{path.text}</p><div className="tags">{path.tags.map((tag) => <i key={tag}>{tag}</i>)}</div><a href="#toolkits">Explore path <b>↗</b></a></article>)}</div></section>

    <section className="toolkits section" id="tools"><SectionHeading eyebrow="QA TOOLKITS" title={<>Useful tools.<br /><em>No fluff.</em></>} copy="Small resources designed to make your day-to-day quality work clearer, faster, and more confident." /><div className="toolkit-list">{toolkits.map(([number, title, description, status]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><em>{status}</em></article>)}</div></section>

    <AskWatt />

    <WeeklyNotes />

    <section className="focus section"><p className="eyebrow">WHAT WE’RE EXPLORING</p><div>{focusAreas.map((area) => <span key={area}>{area}</span>)}</div></section>

    <section className="contact section" id="contact"><p className="eyebrow">STAY IN THE LOOP</p><h2>One useful QA idea<br />at a <em>time.</em></h2><p className="contact-copy">New weekly notes and practical QA tools are on the way. Follow along, explore the work, and keep learning.</p><div className="contact-links"><a href="https://www.linkedin.com/in/derrick-watson-watson/" target="_blank" rel="noreferrer" className="contact-email">Connect on LinkedIn <span>↗</span></a><a href="https://github.com/Dream-Like-King" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:watson.derrick@outlook.com">Email Derrick ↗</a></div></section>
    <footer><Logo compact /><p>© {new Date().getFullYear()} It’s Watt. Built for better software.</p><div><a href="#top">Back to top ↑</a><a href="https://www.linkedin.com/in/derrick-watson-watson/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></footer>
  </main>
}
export default App
