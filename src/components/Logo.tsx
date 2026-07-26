type LogoProps = { compact?: boolean }

export function Logo({ compact = false }: LogoProps) {
  return <a className="logo" href="#top" aria-label="It's Watt home"><span className="bolt">ϟ</span><span>{compact ? 'Watt' : "it's watt"}</span></a>
}
