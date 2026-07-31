import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { AskWatt } from './components/AskWatt'
import { MobileDock } from './components/MobileDock'
import { LearnHub } from './components/LearnHub'
import { StoryHub } from './components/StoryHub'
import { PracticeHub } from './components/PracticeHub'
import { ToolkitsHub } from './components/ToolkitsHub'
import { ResourcesHub } from './components/ResourcesHub'
import { SoftwareHub } from './components/SoftwareHub'
import { CareerHub } from './components/CareerHub'
import { WeeklyNotes } from './components/WeeklyNotes'
import { HomeDashboard } from './components/HomeDashboard'
import { Logo } from './components/Logo'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isLearnOpen, setIsLearnOpen] = useState(() => window.location.hash === '#learn-hub')
  const [isStoryOpen, setIsStoryOpen] = useState(() => window.location.hash === '#my-story')
  const [isPracticeOpen, setIsPracticeOpen] = useState(() => window.location.hash === '#practice-lab')
  const [isToolkitsOpen, setIsToolkitsOpen] = useState(() => window.location.hash === '#qa-toolkits')
  const [isResourcesOpen, setIsResourcesOpen] = useState(() => window.location.hash === '#resources-hub')
  const [isSoftwareOpen, setIsSoftwareOpen] = useState(() => window.location.hash === '#qa-software')
  const [isCareerOpen, setIsCareerOpen] = useState(() => window.location.hash === '#career-paths')
  const [learnTarget, setLearnTarget] = useState<string | null>(null)
  const openLearn = (target = 'top') => { setLearnTarget(target); window.history.pushState(null, '', '#learn-hub'); setIsCareerOpen(false); setIsSoftwareOpen(false); setIsResourcesOpen(false); setIsToolkitsOpen(false); setIsPracticeOpen(false); setIsStoryOpen(false); setIsLearnOpen(true) }
  const openStory = () => { window.history.pushState(null, '', '#my-story'); setIsCareerOpen(false); setIsSoftwareOpen(false); setIsResourcesOpen(false); setIsToolkitsOpen(false); setIsPracticeOpen(false); setIsLearnOpen(false); setIsStoryOpen(true); window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' })) }
  const openPractice = () => { window.history.pushState(null, '', '#practice-lab'); setIsCareerOpen(false); setIsSoftwareOpen(false); setIsResourcesOpen(false); setIsToolkitsOpen(false); setIsStoryOpen(false); setIsLearnOpen(false); setIsPracticeOpen(true); window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' })) }
  const openToolkits = () => { window.history.pushState(null, '', '#qa-toolkits'); setIsCareerOpen(false); setIsSoftwareOpen(false); setIsResourcesOpen(false); setIsPracticeOpen(false); setIsStoryOpen(false); setIsLearnOpen(false); setIsToolkitsOpen(true); window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' })) }
  const openResources = () => { window.history.pushState(null, '', '#resources-hub'); setIsCareerOpen(false); setIsSoftwareOpen(false); setIsToolkitsOpen(false); setIsPracticeOpen(false); setIsStoryOpen(false); setIsLearnOpen(false); setIsResourcesOpen(true); window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' })) }
  const openSoftware = () => { window.history.pushState(null, '', '#qa-software'); setIsCareerOpen(false); setIsResourcesOpen(false); setIsToolkitsOpen(false); setIsPracticeOpen(false); setIsStoryOpen(false); setIsLearnOpen(false); setIsSoftwareOpen(true); window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' })) }
  const openCareer = () => { window.history.pushState(null, '', '#career-paths'); setIsSoftwareOpen(false); setIsResourcesOpen(false); setIsToolkitsOpen(false); setIsPracticeOpen(false); setIsStoryOpen(false); setIsLearnOpen(false); setIsCareerOpen(true); window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' })) }
  const closeFocusedView = () => { window.history.pushState(null, '', '#top'); setIsLearnOpen(false); setIsStoryOpen(false); setIsPracticeOpen(false); setIsToolkitsOpen(false); setIsResourcesOpen(false); setIsSoftwareOpen(false); setIsCareerOpen(false) }
  useEffect(() => {
    const syncFocusedView = () => { setIsLearnOpen(window.location.hash === '#learn-hub'); setIsStoryOpen(window.location.hash === '#my-story'); setIsPracticeOpen(window.location.hash === '#practice-lab'); setIsToolkitsOpen(window.location.hash === '#qa-toolkits'); setIsResourcesOpen(window.location.hash === '#resources-hub'); setIsSoftwareOpen(window.location.hash === '#qa-software'); setIsCareerOpen(window.location.hash === '#career-paths') }
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
    {isStoryOpen ? <StoryHub onClose={closeFocusedView} onOpenLearn={() => openLearn()} onOpenTools={openToolkits} /> : isPracticeOpen ? <PracticeHub onClose={closeFocusedView} onOpenTools={openToolkits} /> : isToolkitsOpen ? <ToolkitsHub onClose={closeFocusedView} /> : isResourcesOpen ? <ResourcesHub onClose={closeFocusedView} onOpenChat={() => setIsChatOpen(true)} onOpenToolkits={openToolkits} onOpenLearn={() => openLearn()} onOpenWeekly={() => navigateHome('weekly')} /> : isSoftwareOpen ? <SoftwareHub onClose={closeFocusedView} /> : isCareerOpen ? <CareerHub onClose={closeFocusedView} onOpenResources={openResources} /> : isLearnOpen ? <LearnHub onClose={closeFocusedView} onOpenTools={openToolkits} onOpenPractice={openPractice} /> : <>
    <main id="content" tabIndex={-1}>
    <span id="top" aria-hidden="true" />
    <div className="hero-glow"></div><Navbar onOpenChat={() => setIsChatOpen(true)} onOpenLearn={openLearn} onOpenCareer={openCareer} onOpenStory={openStory} onOpenToolkits={openToolkits} onOpenResources={openResources} onOpenSoftware={openSoftware} />
    <section className="hero education-hero">
      <div className="hero-grid" aria-hidden="true"></div><div className="orb orb-one"></div><div className="orb orb-two"></div>
      <div className="hero-content"><p className="eyebrow hero-eyebrow"><span></span> AUTOMATION · AI · QUALITY ENGINEERING</p><h1>Practical QA education<br />for the <em>AI era.</em></h1><p className="hero-copy">Learn the testing habits, automation patterns, and AI workflows that help you build software people can trust.</p><div className="hero-actions"><button type="button" className="button primary" onClick={() => openLearn('learning-levels')}>Start learning <span>↓</span></button><button type="button" className="button quiet" onClick={openToolkits}>Open QA Toolkits <span>↗</span></button></div></div>
      <div className="hero-footer"><span>LEARN IN PUBLIC. TEST WITH PURPOSE.</span><span className="scroll-mark">EXPLORE THE HUB <i></i></span></div>
    </section>

    <HomeDashboard onOpenLearn={() => openLearn()} onOpenPractice={openPractice} onOpenToolkits={openToolkits} onOpenCareer={openCareer} />

    <WeeklyNotes compact />

    <section className="contact section" id="contact"><p className="eyebrow">STAY IN THE LOOP</p><h2>One useful QA idea<br />at a <em>time.</em></h2><p className="contact-copy">New weekly notes and practical QA tools are on the way. Follow along, explore the work, and keep learning.</p><div className="contact-links"><a href="https://www.linkedin.com/in/derrick-watson-watson/" target="_blank" rel="noreferrer" className="contact-email">Connect on LinkedIn <span>↗</span></a><a href="https://github.com/Dream-Like-King" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:watson.derrick@outlook.com">Email Derrick ↗</a></div></section>
    <footer><Logo compact /><p>© {new Date().getFullYear()} It's Watts. Built for better software.</p><div><a href="#top">Back to top ↑</a><a href="https://www.linkedin.com/in/derrick-watson-watson/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></footer>
    </main>
    <button className="desktop-chat-fab" type="button" onClick={() => setIsChatOpen(true)}><span aria-hidden="true">ϟ</span> Ask Watt</button>
    </>}
    <MobileDock onOpenChat={() => setIsChatOpen(true)} onOpenLearn={openLearn} onOpenCareer={openCareer} onOpenStory={openStory} onOpenPractice={openPractice} onOpenToolkits={openToolkits} onOpenResources={openResources} onOpenSoftware={openSoftware} onNavigateHome={isLearnOpen || isStoryOpen || isPracticeOpen || isToolkitsOpen || isResourcesOpen || isSoftwareOpen || isCareerOpen ? navigateHome : undefined} focusedView={isStoryOpen ? 'story' : isPracticeOpen ? 'practice' : isToolkitsOpen ? 'toolkits' : isResourcesOpen ? 'resources' : isSoftwareOpen ? 'software' : isCareerOpen ? 'career' : isLearnOpen ? 'learn' : null} />
    <AskWatt isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
  </>
}
export default App
