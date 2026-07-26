import type { ReactNode } from 'react'

type Props = { eyebrow: string; title: ReactNode; copy?: string }
export function SectionHeading({ eyebrow, title, copy }: Props) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>
}
