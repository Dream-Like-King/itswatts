import { useState } from 'react'
import type { FormEvent } from 'react'

const prompts = ['What should I automate first?', 'How can AI help QA?', 'Explain Playwright basics']

export function AskWatt() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('I’m Watt. Ask about QA fundamentals, automation, accessibility, or practical AI workflows.')
  const send = (event: FormEvent) => {
    event.preventDefault()
    if (!message.trim()) return
    setResponse(`Great question. “${message.trim()}” is exactly the kind of QA topic Watt is being built to teach. Connect an AI provider to make this a live learning assistant.`)
    setMessage('')
  }
  return <section className="ask section" id="ask-watt">
    <div className="ask-copy"><p className="eyebrow">MEET WATT</p><h2>Your on-demand<br /><em>QA learning</em><br />partner.</h2><p>Watt is being built to help you learn testing fundamentals, reason through automation choices, and explore practical AI workflows.</p><div className="availability"><span></span> Ready when you are</div></div>
    <div className="chat-shell">
      <div className="chat-top"><div><span className="status-dot"></span> WATT <small>AI QA ASSISTANT</small></div><span>•••</span></div>
      <div className="chat-body"><div className="message"><span className="avatar">ϟ</span><p>{response}</p></div><p className="suggested-label">TRY ASKING</p><div className="prompt-list">{prompts.map((prompt) => <button key={prompt} onClick={() => { setMessage(prompt); setResponse(`Watt demo is ready for: “${prompt}”`); }}>{prompt}<span>↗</span></button>)}</div></div>
      <form className="chat-input" onSubmit={send}><input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask Watt anything…" aria-label="Ask Watt a question" /><button type="submit" aria-label="Send question">↑</button></form>
    </div>
  </section>
}
