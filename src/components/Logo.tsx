type LogoProps = { compact?: boolean }

export function Logo({ compact = false }: LogoProps) {
  return <a className="logo" href="#top" aria-label="It's Watts home"><span>{compact ? 'it’s watt' : "it’s watt"}</span><span className="bolt" aria-hidden="true">ϟ</span></a>
}
