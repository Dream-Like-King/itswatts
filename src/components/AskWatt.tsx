import { useState } from 'react'
import type { FormEvent } from 'react'

const prompts = ['What does Derrick build?', 'Show QA strengths', 'How does AI fit in?']

export function AskWatt() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('I’m Watt. Ask about quality engineering, automation, AI, or what Derrick is building next.')
  const send = (event: FormEvent) => {
    event.preventDefault()
    if (!message.trim()) return
    setResponse(`Great question. “${message.trim()}” is exactly the kind of conversation Watt will be built to support. Connect an AI provider to make this live.`)
    setMessage('')
  }
  return <section className="ask section" id="ask-watt">
    <div className="ask-copy"><p className="eyebrow">MEET WATT</p><h2>A little more<br />useful than a<br />static portfolio.</h2><p>Watt is a conversational introduction to the work, ideas, and quality mindset behind It’s Watt.</p><div className="availability"><span></span> Ready when you are</div></div>
    <div className="chat-shell">
      <div className="chat-top"><div><span className="status-dot"></span> WATT <small>AI QA ASSISTANT</small></div><span>•••</span></div>
      <div className="chat-body"><div className="message"><span className="avatar">ϟ</span><p>{response}</p></div><p className="suggested-label">TRY ASKING</p><div className="prompt-list">{prompts.map((prompt) => <button key={prompt} onClick={() => { setMessage(prompt); setResponse(`Watt demo is ready for: “${prompt}”`); }}>{prompt}<span>↗</span></button>)}</div></div>
      <form className="chat-input" onSubmit={send}><input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask Watt anything…" aria-label="Ask Watt a question" /><button type="submit" aria-label="Send question">↑</button></form>
    </div>
  </section>
}
