import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { AskWatt } from './components/AskWatt'
import { MobileDock } from './components/MobileDock'
import { LearnHub } from './components/LearnHub'
import { StoryHub } from './components/StoryHub'
import { PracticeHub } from './components/PracticeHub'
import { WeeklyNotes } from './components/WeeklyNotes'
import { QaToolkits } from './components/QaToolkits'
import { GrowthHub } from './components/GrowthHub'
import { LearningPaths } from './components/LearningPaths'
import { ResourceLibrary } from './components/ResourceLibrary'
import { FocusTools } from './components/FocusTools'
import { Logo } from './components/Logo'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isLearnOpen, setIsLearnOpen] = useState(() => window.location.hash === '#learn-hub')
  const [isStoryOpen, setIsStoryOpen] = useState(() => window.location.hash === '#my-story')
  const [isPracticeOpen, setIsPracticeOpen] = useState(() => window.location.hash === '#practice-lab')
  const [learnTarget, setLearnTarget] = useState<string | null>(null)
  const openLearn = (target = 'top') => { setLearnTarget(target); window.history.pushState(null, '', '#learn-hub'); setIsPracticeOpen(false); setIsStoryOpen(false); setIsLearnOpen(true) }
  const openStory = () => { window.history.pushState(null, '', '#my-story'); setIsPracticeOpen(false); setIsLearnOpen(false); setIsStoryOpen(true); window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' })) }
  const openPractice = () => { window.history.pushState(null, '', '#practice-lab'); setIsStoryOpen(false); setIsLearnOpen(false); setIsPracticeOpen(true); window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' })) }
  const closeFocusedView = () => { window.history.pushState(null, '', '#top'); setIsLearnOpen(false); setIsStoryOpen(false); setIsPracticeOpen(false) }
  useEffect(() => {
    const syncFocusedView = () => { setIsLearnOpen(window.location.hash === '#learn-hub'); setIsStoryOpen(window.location.hash === '#my-story'); setIsPracticeOpen(window.location.hash === '#practice-lab') }
    window.addEventListener('popstate', syncFocusedView)
    window.addEventListener('hashchange', syncFocusedView)
    return () => { window.removeEventListener('popstate', syncFocusedView); window.removeEventListener('hashchange', syncFocusedView) }
  }, [])
  useEffect(() => {
    if (!isLearnOpen || !learnTarget) return
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(learnTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setLearnTarget(null)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [isLearnOpen, learnTarget])
  const navigateHome = (target: string) => {
    closeFocusedView()
    window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }
  return <>
    {isStoryOpen ? <StoryHub onClose={closeFocusedView} onOpenLearn={() => openLearn()} onOpenTools={() => navigateHome('tools')} /> : isPracticeOpen ? <PracticeHub onClose={closeFocusedView} onOpenTools={() => navigateHome('tools')} /> : isLearnOpen ? <LearnHub onClose={closeFocusedView} onOpenPaths={() => navigateHome('learn')} onOpenTools={() => navigateHome('tools')} onOpenResources={() => navigateHome('resources')} onOpenPractice={openPractice} /> : <>
    <main id="content" tabIndex={-1}>
    <div className="hero-glow"></div><Navbar onOpenChat={() => setIsChatOpen(true)} onOpenLearn={openLearn} onOpenStory={openStory} />
    <section className="hero education-hero">
      <div className="hero-grid" aria-hidden="true"></div><div className="orb orb-one"></div><div className="orb orb-two"></div>
      <div className="hero-content"><p className="eyebrow hero-eyebrow"><span></span> AUTOMATION · AI · QUALITY ENGINEERING</p><h1>Practical QA education<br />for the <em>AI era.</em></h1><p className="hero-copy">Learn the testing habits, automation patterns, and AI workflows that help you build software people can trust.</p><div className="hero-actions"><a className="button primary" href="#learn">Start learning <span>↓</span></a><a className="button quiet" href="#weekly">Read weekly notes <span>↗</span></a></div></div>
      <div className="hero-footer"><span>LEARN IN PUBLIC. TEST WITH PURPOSE.</span><span className="scroll-mark">EXPLORE THE HUB <i></i></span></div>
    </section>

    <section className="intro section" id="about"><p className="eyebrow">WELCOME TO IT’S WATTS</p><div><h2>A QA learning hub<br />for <em>builders who care.</em></h2><p>It’s Watts turns real quality-engineering practice into approachable lessons, tools, and experiments. Whether you are starting in QA or leveling up your automation skills, you’ll find practical guidance you can use in your next sprint.</p><a className="text-link" href="#weekly">Follow the weekly notes <span>↓</span></a></div></section>

    <LearningPaths />

    <QaToolkits />

    <WeeklyNotes />

    <GrowthHub />

    <ResourceLibrary onOpenChat={() => setIsChatOpen(true)} />

    <FocusTools />

    <section className="contact section" id="contact"><p className="eyebrow">STAY IN THE LOOP</p><h2>One useful QA idea<br />at a <em>time.</em></h2><p className="contact-copy">New weekly notes and practical QA tools are on the way. Follow along, explore the work, and keep learning.</p><div className="contact-links"><a href="https://www.linkedin.com/in/derrick-watson-watson/" target="_blank" rel="noreferrer" className="contact-email">Connect on LinkedIn <span>↗</span></a><a href="https://github.com/Dream-Like-King" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:watson.derrick@outlook.com">Email Derrick ↗</a></div></section>
    <footer><Logo compact /><p>© {new Date().getFullYear()} It's Watts. Built for better software.</p><div><a href="#top">Back to top ↑</a><a href="https://www.linkedin.com/in/derrick-watson-watson/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></footer>
    </main>
    <button className="desktop-chat-fab" type="button" onClick={() => setIsChatOpen(true)}><span aria-hidden="true">ϟ</span> Ask Watt</button>
    </>}
    <MobileDock onOpenChat={() => setIsChatOpen(true)} onOpenLearn={openLearn} onOpenCareer={() => openLearn('career-paths')} onOpenStory={openStory} onOpenPractice={openPractice} onNavigateHome={isLearnOpen || isStoryOpen || isPracticeOpen ? navigateHome : undefined} focusedView={isStoryOpen ? 'story' : isPracticeOpen ? 'practice' : isLearnOpen ? 'learn' : null} />
    <AskWatt isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
  </>
}
export default App
