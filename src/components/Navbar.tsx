import { useState } from 'react'
import { Logo } from './Logo'

const links = [['Learn', 'learn'], ['Tools', 'tools'], ['Resources', 'resources'], ['Weekly notes', 'weekly'], ['About', 'about']]

type NavbarProps = { onOpenChat: () => void; onOpenLearn: () => void }

export function Navbar({ onOpenChat, onOpenLearn }: NavbarProps) {
  const [open, setOpen] = useState(false)
  return <header className="nav-wrap">
    <nav className="nav" aria-label="Main navigation">
      <Logo />
      <div id="main-navigation-links" className={open ? 'nav-links open' : 'nav-links'}>
        {links.map(([label, target]) => target === 'learn' ? <button className="nav-link-button" key={target} type="button" onClick={() => { setOpen(false); onOpenLearn() }}>{label}</button> : <a key={target} href={`#${target}`} onClick={() => setOpen(false)}>{label}</a>)}
      </div>
      <button className="nav-cta" type="button" onClick={onOpenChat}>Ask Watt <span>↗</span></button>
      <button className="menu" type="button" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-controls="main-navigation-links" aria-expanded={open}><i></i><i></i></button>
    </nav>
  </header>
}
