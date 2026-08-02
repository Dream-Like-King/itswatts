import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type MobileDockProps = { onOpenChat: () => void; onOpenLearn: (target?: string) => void; onOpenCareer: () => void; onOpenStory: () => void; onOpenPractice: () => void; onOpenToolkits: () => void; onOpenResources: () => void; onOpenSoftware: () => void; onNavigateHome?: (target: string) => void; focusedView?: 'learn' | 'career' | 'story' | 'practice' | 'toolkits' | 'resources' | 'software' | null }

const primaryItems = [
  ['Learn', 'learn', '⌁'],
  ['Toolkits', 'tools', '⌘'],
  ['Resources', 'resources', '▦'],
] as const

const moreItems = [
  ['Weekly notes', 'weekly', '◷'],
  ['QA Software', 'focus-tools', '◈'],
  ['Career paths', 'career-paths', '↗'],
  ['Practice Lab', 'practice', '◌'],
  ['My story', 'story', '◉'],
  ['Contact', 'contact', '✦'],
] as const

const trackedSections = [...primaryItems.map(([, id]) => id), ...moreItems.map(([, id]) => id)]

export function MobileDock({ onOpenChat, onOpenLearn, onOpenCareer, onOpenStory, onOpenPractice, onOpenToolkits, onOpenResources, onOpenSoftware, onNavigateHome, focusedView = null }: MobileDockProps) {
  const [activeSection, setActiveSection] = useState('learn')
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const dockRef = useRef<HTMLElement>(null)

  const scrollTo = (target: string) => {
    setActiveSection(target)
    setIsMoreOpen(false)
    if (onNavigateHome) {
      onNavigateHome(target)
      return
    }
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (focusedView) {
      setActiveSection(focusedView === 'career' ? 'career-paths' : focusedView === 'story' ? 'story' : focusedView === 'practice' ? 'practice' : focusedView === 'toolkits' ? 'tools' : focusedView === 'resources' ? 'resources' : focusedView === 'software' ? 'focus-tools' : 'learn')
      return
    }
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.2, 0.45] })
    trackedSections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [focusedView])

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) setIsMoreOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsMoreOpen(false) }
    document.addEventListener('mousedown', closeMenu)
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.removeEventListener('mousedown', closeMenu); window.removeEventListener('keydown', closeOnEscape) }
  }, [])

  const isMoreActive = moreItems.some(([, id]) => id === activeSection)
  const dock = <nav className="mobile-dock" aria-label="Quick navigation" ref={dockRef}>
    <button type="button" className={activeSection === 'learn' ? 'active' : ''} onClick={() => onOpenLearn()}><span aria-hidden="true">⌁</span>Learn</button>
    {primaryItems.slice(1, 2).map(([label, target, icon]) => <button key={target} type="button" className={activeSection === target ? 'active' : ''} onClick={onOpenToolkits}><span aria-hidden="true">{icon}</span>{label}</button>)}
    <button className="dock-chat" type="button" onClick={onOpenChat} aria-label="Open Ask Watt"><span aria-hidden="true">ϟ</span><small>Ask Watt</small></button>
    <button type="button" className={activeSection === 'resources' ? 'active' : ''} onClick={onOpenResources}><span aria-hidden="true">▦</span>Resources</button>
    <div className="dock-more"><button type="button" className={isMoreActive ? 'active' : ''} onClick={() => setIsMoreOpen((open) => !open)} aria-expanded={isMoreOpen} aria-controls="dock-more-menu"><span aria-hidden="true">•••</span>More</button>{isMoreOpen && <div className="dock-more-menu" id="dock-more-menu">{moreItems.map(([label, target, icon]) => <button key={target} type="button" className={activeSection === target ? 'active' : ''} onClick={() => { if (target === 'focus-tools') { setIsMoreOpen(false); onOpenSoftware() } else if (target === 'career-paths') { setIsMoreOpen(false); onOpenCareer() } else if (target === 'practice') { setIsMoreOpen(false); onOpenPractice() } else if (target === 'story') { setIsMoreOpen(false); onOpenStory() } else scrollTo(target) }}><span aria-hidden="true">{icon}</span>{label}</button>)}</div>}</div>
  </nav>

  // Render at the page level so no scrolling content container can affect its
  // fixed placement on mobile browsers.
  return createPortal(dock, document.body)
}
