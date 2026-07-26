const instruction = `You are Watt, a practical and encouraging QA education assistant for It's Watts. Your scope is quality assurance, testing fundamentals, automation strategy, Playwright, Selenium, API testing, accessibility testing, defect reporting, release readiness, and responsible AI-assisted QA. Give concise, useful answers for learners. Lead with a direct recommendation, then give 3-5 practical steps or examples. Do not claim to have tested a user's product, accessed private systems, or replaced professional judgment. If asked outside QA education, say that you focus on QA learning and suggest a relevant QA angle when possible.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' })
  const { message, safetyId } = req.body ?? {}
  if (typeof message !== 'string' || message.trim().length < 2 || message.length > 1800) return res.status(400).json({ error: 'Ask a QA question using 2 to 1,800 characters.' })
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'Ask Watt is not connected yet. Add OPENAI_API_KEY in Vercel to make it live.' })
  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/responses', { method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gpt-5.6-terra', instructions: instruction, input: message.trim(), reasoning: { effort: 'low' }, text: { verbosity: 'low' }, max_output_tokens: 500, safety_identifier: typeof safetyId === 'string' ? safetyId.slice(0, 128) : undefined }) })
    const data = await openaiResponse.json()
    if (!openaiResponse.ok) {
      const isQuotaIssue = data.error?.code === 'insufficient_quota' || data.error?.type === 'insufficient_quota'
      const error = isQuotaIssue
        ? 'Ask Watt is temporarily offline while we refresh its learning credits. Please check back soon.'
        : 'Ask Watt could not answer right now. Please try again in a moment.'
      return res.status(openaiResponse.status).json({ error })
    }
    return res.status(200).json({ answer: data.output_text || 'I could not form a response. Please try again.' })
  } catch { return res.status(500).json({ error: 'Ask Watt encountered a temporary problem. Please try again.' }) }
}
