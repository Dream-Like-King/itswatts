import { useEffect, useRef, useState } from 'react'

type MobileDockProps = { onOpenChat: () => void; onOpenLearn: () => void }

const primaryItems = [
  ['Learn', 'learn', '⌁'],
  ['Tools', 'tools', '⌘'],
  ['Resources', 'resources', '▦'],
] as const

const moreItems = [
  ['Weekly notes', 'weekly', '◷'],
  ['Contact', 'contact', '✦'],
] as const

const trackedSections = [...primaryItems.map(([, id]) => id), ...moreItems.map(([, id]) => id)]

export function MobileDock({ onOpenChat, onOpenLearn }: MobileDockProps) {
  const [activeSection, setActiveSection] = useState('learn')
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const dockRef = useRef<HTMLElement>(null)

  const scrollTo = (target: string) => {
    setActiveSection(target)
    setIsMoreOpen(false)
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.2, 0.45] })
    trackedSections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

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
  return <nav className="mobile-dock" aria-label="Quick navigation" ref={dockRef}>
    <button type="button" className={activeSection === 'learn' ? 'active' : ''} onClick={onOpenLearn}><span aria-hidden="true">⌁</span>Learn</button>
    {primaryItems.slice(1, 2).map(([label, target, icon]) => <button key={target} type="button" className={activeSection === target ? 'active' : ''} onClick={() => scrollTo(target)}><span aria-hidden="true">{icon}</span>{label}</button>)}
    <button className="dock-chat" type="button" onClick={onOpenChat} aria-label="Open Ask Watt"><span aria-hidden="true">ϟ</span><small>Ask Watt</small></button>
    <button type="button" className={activeSection === 'resources' ? 'active' : ''} onClick={() => scrollTo('resources')}><span aria-hidden="true">▦</span>Resources</button>
    <div className="dock-more"><button type="button" className={isMoreActive ? 'active' : ''} onClick={() => setIsMoreOpen((open) => !open)} aria-expanded={isMoreOpen} aria-controls="dock-more-menu"><span aria-hidden="true">•••</span>More</button>{isMoreOpen && <div className="dock-more-menu" id="dock-more-menu">{moreItems.map(([label, target, icon]) => <button key={target} type="button" className={activeSection === target ? 'active' : ''} onClick={() => scrollTo(target)}><span aria-hidden="true">{icon}</span>{label}</button>)}</div>}</div>
  </nav>
}
