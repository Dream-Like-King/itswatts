import { useEffect, useState } from 'react'
import { posts } from '../data/site'

export function WeeklyNotes() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activePost = activeIndex === null ? null : posts[activeIndex]

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveIndex(null) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return <section className="weekly section" id="weekly">
    <div className="section-heading"><p className="eyebrow">THE WEEKLY NOTE</p><h2>Learn something<br /><em>worth testing.</em></h2><p className="section-copy">Short, practical thoughts on automation, AI, and quality—published as the work evolves.</p></div>
    <div className="posts-grid">{posts.map((post, index) => <article className="post-card" key={post.title}><p className="post-date">{post.date} · {post.readTime}</p><span>{post.category}</span><h3>{post.title}</h3><p>{post.description}</p><button onClick={() => setActiveIndex(index)}>Read note <b>↗</b></button></article>)}</div>
    <a className="button outline" href="https://www.linkedin.com/in/derrick-watson-watson/" target="_blank" rel="noreferrer">Follow for the next note <span>↗</span></a>
    {activePost && <div className="note-overlay" role="presentation" onMouseDown={() => setActiveIndex(null)}><article className="note-dialog" role="dialog" aria-modal="true" aria-labelledby="note-title" onMouseDown={(event) => event.stopPropagation()}><button className="note-close" onClick={() => setActiveIndex(null)} aria-label="Close article">×</button><p className="eyebrow">{activePost.date} · {activePost.category}</p><h2 id="note-title">{activePost.title}</h2><p className="note-intro">{activePost.intro}</p>{activePost.sections.map(([heading, copy]) => <section key={heading}><h3>{heading}</h3><p>{copy}</p></section>)}<div className="note-footer"><span>{activePost.readTime}</span><button onClick={() => setActiveIndex(null)}>Back to notes ↑</button></div></article></div>}
  </section>
}
