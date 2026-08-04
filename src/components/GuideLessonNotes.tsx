type Guide = 'automation-ai' | 'test-design' | 'api-testing' | 'rag-training'

const notes: Record<Guide, Record<string, { remember: string; tryIt: string }>> = {
  'automation-ai': {
    'The distinction': { remember: 'Automation is best when the expected result is clear and repeatable. AI is useful when the task needs a draft, summary, or pattern-finding first pass.', tryIt: 'Choose one recurring check from your work. Write one sentence explaining which part should stay human-owned.' },
    'Use automation': { remember: 'A reliable test is readable, has stable data, and fails with evidence the team can act on.', tryIt: 'List one high-value flow you repeat every release. What makes it stable enough—or not yet stable enough—to automate?' },
    'Use AI support': { remember: 'AI can propose possibilities; it does not know your product context unless you provide it and review the output.', tryIt: 'Give an AI assistant a short user story and ask for risks, then verify each idea against the real requirement.' },
    'Keep humans central': { remember: 'Human judgment matters most when user impact, ambiguity, ethics, accessibility, or changing behavior are involved.', tryIt: 'Think of a recent defect that a script would not have predicted. What question helped someone notice it?' },
    'Combine them': { remember: 'The strongest loop is human direction, AI-assisted preparation, automated feedback, and human interpretation of the result.', tryIt: 'Sketch your next release check as four steps: question, AI support, automated check, and review.' },
  },
  'test-design': {
    'Start with risk': { remember: 'More test cases do not automatically mean better coverage. The value comes from protecting meaningful risk.', tryIt: 'For one feature, write its user goal, worst credible failure, and the first check you would run.' },
    Boundaries: { remember: 'Most boundary defects hide at the edge: immediately below, exactly at, and immediately above the stated limit.', tryIt: 'Find one field with a length, date, amount, or count rule. Write three values around its boundary.' },
    Partitions: { remember: 'Representative values save time when a group of inputs should behave the same way. Boundaries still need their own checks.', tryIt: 'Split an input into valid and invalid groups, then pick one representative from each group.' },
    Decisions: { remember: 'Decision tables expose combinations that a single happy path cannot show, especially where permissions or business rules interact.', tryIt: 'Take two yes/no rules from a workflow and list the four possible combinations with expected outcomes.' },
    'State changes': { remember: 'A workflow is more than one screen. Its valid and invalid transitions often carry the most important risk.', tryIt: 'Draw three states for an order, claim, or account. Mark one transition that should be blocked.' },
    Pairwise: { remember: 'Pairwise coverage reduces a large combination space, but known high-risk combinations still deserve explicit tests.', tryIt: 'List three factors for a feature, then name one risky combination you would test even if it is not selected by pairwise coverage.' },
  },
  'api-testing': {
    'Start here': { remember: 'API testing verifies a contract: what is sent, what comes back, and what behavior that exchange causes.', tryIt: 'Open a browser network panel on a familiar site. Identify one request method, route, status, and response field.' },
    'Build requests': { remember: 'Change one request part at a time so you can connect a behavior change to the method, route, header, parameter, or body that caused it.', tryIt: 'Write a sample request and circle which values identify the target versus which values describe the submitted data.' },
    'Read responses': { remember: 'A 200-level status alone is not proof of success. Check the returned data, headers, and user-visible outcome.', tryIt: 'For a successful response, write one body assertion and one outcome assertion you would expect.' },
    Validate: { remember: 'Validation checks shape and meaning: required fields, types, allowed values, and business rules.', tryIt: 'Choose one response field and write a valid value, an invalid type, and a forbidden value.' },
    'Protect access': { remember: 'Authentication answers “who are you?” Authorization answers “are you allowed to do this?” Test both separately.', tryIt: 'Choose one protected route and list the expected result for no token, a normal user, and an authorized role.' },
    'Handle failure': { remember: 'Failure behavior is part of the contract. A safe API tells callers what happened without exposing internal details or duplicating work.', tryIt: 'Name one retry or timeout risk in a workflow and the evidence you would use to prove it recovered safely.' },
  },
  'rag-training': {
    'The idea': { remember: 'RAG improves an answer by supplying relevant approved information at answer time. It does not make a weak source trustworthy.', tryIt: 'Pick one user question and name the document or policy an answer should be grounded in.' },
    'Prepare content': { remember: 'Clear ownership, dates, access labels, and focused chunks make retrieval more reliable and auditable.', tryIt: 'Review one internal document. What owner, review date, audience label, or duplicate-content issue would you add?' },
    'Retrieve well': { remember: 'QA should inspect the passages retrieved before judging the final answer; fluent language can hide weak context.', tryIt: 'Write three different phrasings of the same question. What source should each retrieve?' },
    'Ground answers': { remember: 'A good answer stays within the evidence and says when evidence is missing, conflicting, or unavailable.', tryIt: 'Take one answer claim and highlight the exact source statement that supports it. What happens if none exists?' },
    'Test risks': { remember: 'RAG introduces retrieval and access risks: stale sources, private content, malicious text in documents, and unsafe fallback behavior.', tryIt: 'Create one negative test for a user who should not be able to retrieve an internal policy.' },
    Evaluate: { remember: 'Evaluation needs representative questions and clear scoring criteria for relevance, grounding, completeness, and safety.', tryIt: 'Create a three-question evaluation set and write what a pass would require for each question.' },
  },
}

export function GuideLessonNotes({ guide, lesson }: { guide: Guide; lesson: string }) {
  const note = notes[guide][lesson]
  if (!note) return null
  return <aside className="guide-lesson-notes"><div><p className="eyebrow">REMEMBER</p><p>{note.remember}</p></div><div><p className="eyebrow">TRY IT</p><p>{note.tryIt}</p></div></aside>
}
