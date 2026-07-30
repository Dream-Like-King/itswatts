type MobileDockProps = { onOpenChat: () => void }

const items = [
  ['Learn', 'learn', '⌁'],
  ['Tools', 'tools', '⌘'],
  ['Resources', 'resources', '▦'],
  ['Weekly', 'weekly', '◷'],
  ['About', 'about', '◌'],
] as const

export function MobileDock({ onOpenChat }: MobileDockProps) {
  const scrollTo = (target: string) => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return <nav className="mobile-dock" aria-label="Quick navigation">
    {items.slice(0, 2).map(([label, target, icon]) => <button key={target} type="button" onClick={() => scrollTo(target)}><span aria-hidden="true">{icon}</span>{label}</button>)}
    <button className="dock-chat" type="button" onClick={onOpenChat} aria-label="Open Ask Watt"><span aria-hidden="true">ϟ</span><small>Ask Watt</small></button>
    {items.slice(2).map(([label, target, icon]) => <button key={target} type="button" onClick={() => scrollTo(target)}><span aria-hidden="true">{icon}</span>{label}</button>)}
  </nav>
}
