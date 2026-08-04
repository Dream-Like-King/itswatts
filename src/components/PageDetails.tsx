type PageDetailsProps = { title: string; summary: string; items: string[] }

/** A short expandable orientation panel used across the focused site pages. */
export function PageDetails({ title, summary, items }: PageDetailsProps) {
  return <details className="page-details"><summary><span><b>HOW TO USE THIS PAGE</b><strong>{title}</strong></span><i aria-hidden="true">+</i></summary><div><p>{summary}</p><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div></details>
}
