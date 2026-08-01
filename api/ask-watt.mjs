const instruction = `You are Watt, a practical and encouraging QA education assistant for it’s wattϟ. Your scope is quality assurance, testing fundamentals, automation strategy, Playwright, Selenium, API testing, accessibility testing, defect reporting, release readiness, and responsible AI-assisted QA.

Keep default answers short, clear, and beginner-friendly: aim for 80–140 words. Start with a direct one-sentence answer, then use at most three short bullet points beginning with • when steps help. Use plain text only: no Markdown headings, bold markers, backticks, tables, or code fences. Do not include code unless the user specifically asks for code or an example. If code is requested, give one small focused example and a one-sentence explanation. Avoid repeating the question or listing every possible detail.

Use the supplied conversation context to understand natural follow-up requests such as “tell me more” or “show an example.” Do not claim to have tested a user's product, accessed private systems, or replaced professional judgment. If asked outside QA education, say that you focus on QA learning and suggest a relevant QA angle when possible.`

const requestsByVisitor = new Map()
const rateLimitWindowMs = 60 * 60 * 1000
const maxRequestsPerWindow = 15

function checkRateLimit(visitorId) {
  const now = Date.now()
  const earliestAllowed = now - rateLimitWindowMs
  const recentRequests = (requestsByVisitor.get(visitorId) ?? []).filter((timestamp) => timestamp > earliestAllowed)
  if (recentRequests.length >= maxRequestsPerWindow) {
    requestsByVisitor.set(visitorId, recentRequests)
    return { allowed: false, retryAfterSeconds: Math.ceil((recentRequests[0] + rateLimitWindowMs - now) / 1000) }
  }
  recentRequests.push(now)
  requestsByVisitor.set(visitorId, recentRequests)
  return { allowed: true }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' })
  const { message, history, safetyId } = req.body ?? {}
  if (typeof message !== 'string' || message.trim().length < 2 || message.length > 1800) return res.status(400).json({ error: 'Ask a QA question using 2 to 1,800 characters.' })
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'Ask Watt is not connected yet. Add OPENAI_API_KEY in Vercel to make it live.' })
  const visitorId = typeof safetyId === 'string' && safetyId.trim() ? safetyId.slice(0, 128) : `ip:${String(req.headers['x-forwarded-for'] ?? 'unknown').split(',')[0].trim()}`
  const rateLimit = checkRateLimit(visitorId)
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds))
    return res.status(429).json({ error: `Ask Watt has reached its limit of ${maxRequestsPerWindow} questions per hour for this browser. Please try again a little later.` })
  }
  const historyText = Array.isArray(history)
    ? history.filter((item) => item && (item.role === 'assistant' || item.role === 'user') && typeof item.text === 'string').slice(-8).map((item) => `${item.role === 'assistant' ? 'Watt' : 'Visitor'}: ${item.text.slice(0, 1800)}`).join('\n\n')
    : ''
  const conversation = historyText || `Visitor: ${message.trim()}`
  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/responses', { method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gpt-5.6-luna', instructions: instruction, input: `Conversation so far:\n\n${conversation}\n\nRespond as Watt to the visitor's latest message.`, reasoning: { effort: 'low' }, text: { verbosity: 'low' }, max_output_tokens: 320, safety_identifier: typeof safetyId === 'string' ? safetyId.slice(0, 128) : undefined }) })
    const data = await openaiResponse.json()
    if (!openaiResponse.ok) {
      const isQuotaIssue = data.error?.code === 'insufficient_quota' || data.error?.type === 'insufficient_quota'
      const error = isQuotaIssue
        ? 'Ask Watt is temporarily offline while we refresh its learning credits. Please check back soon.'
        : 'Ask Watt could not answer right now. Please try again in a moment.'
      return res.status(openaiResponse.status).json({ error })
    }
    const answer = Array.isArray(data.output)
      ? data.output.flatMap((item) => Array.isArray(item.content) ? item.content : []).filter((part) => part.type === 'output_text' && typeof part.text === 'string').map((part) => part.text).join('').trim()
      : ''
    if (!answer) return res.status(502).json({ error: 'Ask Watt did not receive a usable answer. Please try again in a moment.' })
    return res.status(200).json({ answer })
  } catch { return res.status(500).json({ error: 'Ask Watt encountered a temporary problem. Please try again.' }) }
}
