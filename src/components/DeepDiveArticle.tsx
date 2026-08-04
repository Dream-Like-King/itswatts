import { useEffect, useState } from 'react'

export function DeepDiveArticle({ label = 'FULL ARTICLE', title, intro, sections, action = 'Read full article', initiallyOpen = false }: { label?: string; title: string; intro: string; sections: ReadonlyArray<readonly [string, string]>; action?: string; initiallyOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initiallyOpen)
  useEffect(() => { if (initiallyOpen) setIsOpen(true) }, [initiallyOpen, title])
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  return <>{!initiallyOpen && <button className="deep-dive-link" type="button" onClick={() => setIsOpen(true)}>{action} <span aria-hidden="true">↗</span></button>}{isOpen && <div className="guide-article-overlay" role="presentation" onMouseDown={() => setIsOpen(false)}><article className="guide-article-dialog" role="dialog" aria-modal="true" aria-labelledby="deep-dive-title" onMouseDown={(event) => event.stopPropagation()}><button type="button" className="guide-article-close" onClick={() => setIsOpen(false)} aria-label="Close article">×</button><p className="eyebrow">{label}</p><h2 id="deep-dive-title">{title}</h2><p className="guide-article-lead">{intro}</p>{sections.map(([heading, copy]) => <section key={heading}><p className="eyebrow">{heading}</p><p>{copy}</p></section>)}<button type="button" className="guide-article-return" onClick={() => setIsOpen(false)}>Back ↑</button></article></div>}</>
}
