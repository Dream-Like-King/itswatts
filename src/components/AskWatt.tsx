import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

const prompts = ['What should I automate first?', 'How can AI help QA?', 'Explain Playwright basics']
type ChatMessage = { role: 'assistant' | 'user'; text: string }

function getSafetyId() {
  const key = 'its-watt-safety-id'
  const existing = window.localStorage.getItem(key)
  if (existing) return existing
  const value = `visitor-${crypto.randomUUID()}`
  window.localStorage.setItem(key, value)
  return value
}

export function AskWatt() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', text: 'I’m Watt. Ask about QA fundamentals, automation, accessibility, or practical AI workflows.' }])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [safetyId, setSafetyId] = useState('')
  useEffect(() => setSafetyId(getSafetyId()), [])
  const ask = async (question: string) => {
    const trimmed = question.trim()
    if (!trimmed || isLoading) return
    setMessages((current) => [...current, { role: 'user', text: trimmed }])
    setMessage(''); setError(''); setIsLoading(true)
    try {
      const response = await fetch('/api/ask-watt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: trimmed, safetyId }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Watt could not answer right now.')
      setMessages((current) => [...current, { role: 'assistant', text: data.answer }])
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Watt could not answer right now.') } finally { setIsLoading(false) }
  }
  const send = (event: FormEvent) => { event.preventDefault(); void ask(message) }
  return <section className="ask section" id="ask-watt">
    <div className="ask-copy"><p className="eyebrow">MEET WATT</p><h2>Your on-demand<br /><em>QA learning</em><br />partner.</h2><p>Watt is a focused AI guide for testing fundamentals, automation choices, and practical AI workflows.</p><div className="availability"><span></span> Live QA guidance</div></div>
    <div className="chat-shell"><div className="chat-top"><div><span className="status-dot"></span> WATT <small>AI QA ASSISTANT</small></div><span>•••</span></div><div className="chat-body"><div className="chat-history">{messages.map((chat, index) => <div className={`message ${chat.role}`} key={`${chat.role}-${index}`}><span className="avatar">{chat.role === 'assistant' ? 'ϟ' : 'YOU'}</span><p>{chat.text}</p></div>)}{isLoading && <div className="message assistant"><span className="avatar">ϟ</span><p className="typing">Watt is thinking<span>•••</span></p></div>}</div>{error && <p className="chat-error" role="status">{error}</p>}<p className="suggested-label">TRY ASKING</p><div className="prompt-list">{prompts.map((prompt) => <button key={prompt} onClick={() => void ask(prompt)} disabled={isLoading}>{prompt}<span>↗</span></button>)}</div></div><form className="chat-input" onSubmit={send}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask Watt anything…" aria-label="Ask Watt a question" disabled={isLoading} /><button type="submit" aria-label="Send question" disabled={isLoading}>↑</button></form></div>
  </section>
}
