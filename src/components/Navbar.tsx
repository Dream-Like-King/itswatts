import { useState } from 'react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

const links = [['Learn', 'learn'], ['Career paths', 'career-paths'], ['Practice Labs', 'practice'], ['Toolkits', 'tools'], ['Resources', 'resources'], ['QA software', 'focus-tools'], ['Weekly notes', 'weekly'], ['My story', 'my-story']]

type NavbarProps = { onOpenChat: () => void; onOpenLearn: () => void; onOpenCareer: () => void; onOpenPractice: () => void; onOpenStory: () => void; onOpenToolkits: () => void; onOpenResources: () => void; onOpenSoftware: () => void; theme: 'light' | 'dark'; onToggleTheme: () => void }

export function Navbar({ onOpenChat, onOpenLearn, onOpenCareer, onOpenPractice, onOpenStory, onOpenToolkits, onOpenResources, onOpenSoftware, theme, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false)
  return <header className="nav-wrap">
    <nav className="nav" aria-label="Main navigation">
      <Logo />
      <div id="main-navigation-links" className={open ? 'nav-links open' : 'nav-links'}>
        {links.map(([label, target]) => target === 'learn' ? <button className="nav-link-button" key={target} type="button" onClick={() => { setOpen(false); onOpenLearn() }}>{label}</button> : target === 'career-paths' ? <button className="nav-link-button" key={target} type="button" onClick={() => { setOpen(false); onOpenCareer() }}>{label}</button> : target === 'practice' ? <button className="nav-link-button" key={target} type="button" onClick={() => { setOpen(false); onOpenPractice() }}>{label}</button> : target === 'tools' ? <button className="nav-link-button" key={target} type="button" onClick={() => { setOpen(false); onOpenToolkits() }}>{label}</button> : target === 'resources' ? <button className="nav-link-button" key={target} type="button" onClick={() => { setOpen(false); onOpenResources() }}>{label}</button> : target === 'focus-tools' ? <button className="nav-link-button" key={target} type="button" onClick={() => { setOpen(false); onOpenSoftware() }}>{label}</button> : target === 'my-story' ? <button className="nav-link-button" key={target} type="button" onClick={() => { setOpen(false); onOpenStory() }}>{label}</button> : <a key={target} href={`#${target}`} onClick={() => setOpen(false)}>{label}</a>)}
      </div>
      <button className="nav-cta" type="button" onClick={onOpenChat}>Ask Watt <span>↗</span></button>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <button className="menu" type="button" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-controls="main-navigation-links" aria-expanded={open}><i></i><i></i></button>
    </nav>
  </header>
}
