type LogoProps = { compact?: boolean; onHome?: () => void }

export function Logo({ compact = false, onHome }: LogoProps) {
  return <a className="logo" href="#top" onClick={onHome ? (event) => { event.preventDefault(); onHome() } : undefined} aria-label="it’s Wattϟ home"><span>{compact ? 'it’s Watt' : "it’s Watt"}</span><span className="bolt" aria-hidden="true">ϟ</span></a>
}
