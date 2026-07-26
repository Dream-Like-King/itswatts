import { useEffect, useState } from 'react'
import { learningPaths } from '../data/site'

export function LearningPaths() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activePath = activeIndex === null ? null : learningPaths[activeIndex]
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveIndex(null) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])
  return <section className="capabilities section" id="learn">
    <div className="section-heading"><p className="eyebrow">START HERE</p><h2>Build your QA foundation.</h2><p className="section-copy">Clear learning paths for the skills that matter most in modern quality engineering.</p></div>
    <div className="learning-grid">{learningPaths.map((path, index) => <article className="learning-card" key={path.number}><span>{path.number}</span><div className="plus">+</div><h3>{path.title}</h3><p>{path.text}</p><div className="tags">{path.tags.map((tag) => <i key={tag}>{tag}</i>)}</div><button onClick={() => setActiveIndex(index)}>Explore path <b>↗</b></button></article>)}</div>
    {activePath && <div className="path-overlay" role="presentation" onMouseDown={() => setActiveIndex(null)}><article className="path-dialog" role="dialog" aria-modal="true" aria-labelledby="path-title" onMouseDown={(event) => event.stopPropagation()}><button className="path-close" onClick={() => setActiveIndex(null)} aria-label="Close learning path">×</button><p className="eyebrow">LEARNING PATH · {activePath.number}</p><h2 id="path-title">{activePath.title}</h2><p className="path-summary">{activePath.summary}</p><div className="path-lessons">{activePath.lessons.map(([title, copy], index) => <article key={title}><span>LESSON {index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><i>↗</i></article>)}</div><div className="path-footer"><span>3 LESSONS · SELF-PACED</span><button onClick={() => setActiveIndex(null)}>Back to learning ↑</button></div></article></div>}
  </section>
}
