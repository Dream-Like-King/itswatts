import { useState } from 'react'
import { Logo } from './Logo'

const links = [['Learn', 'learn'], ['Tools', 'tools'], ['Weekly notes', 'weekly'], ['About', 'about']]

export function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="nav-wrap">
    <nav className="nav" aria-label="Main navigation">
      <Logo />
      <div className={open ? 'nav-links open' : 'nav-links'}>
        {links.map(([label, target]) => <a key={target} href={`#${target}`} onClick={() => setOpen(false)}>{label}</a>)}
      </div>
      <a className="nav-cta" href="#ask-watt">Ask Watt <span>↗</span></a>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}><i></i><i></i></button>
    </nav>
  </header>
}
