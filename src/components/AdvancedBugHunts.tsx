import { useEffect, useState } from 'react'

const shuffle = <T,>(items: readonly T[]) => [...items].sort(() => Math.random() - 0.5)

type Finding = { id: string; title: string; isBug: boolean; explanation: string }
type Challenge = { label: string; level: string; title: string; brief: string; actions: Array<[string, string]>; findings: Finding[] }

const challenges: Challenge[] = [
  { label: 'PASSWORD RECOVERY', level: 'INTERMEDIATE', title: 'Recover an account without creating new risk.', brief: 'Explore this simulated reset flow, observe what the product tells the user, then log only the genuine defects.', actions: [['Request an unknown email', 'The page says: “No account exists for that email address.”'], ['Open the expired reset link', 'The link opens the password form and allows a new password to be saved.'], ['Send another reset request', 'Two reset emails are sent within seconds.'], ['Save a weak password', 'The form accepts “password” with no requirements or guidance.']], findings: [{ id: 'enumeration', title: 'Reset message reveals whether an account exists', isBug: true, explanation: 'Recovery messages should avoid exposing account existence because that can support account enumeration.' }, { id: 'expired', title: 'Expired reset link can still change the password', isBug: true, explanation: 'A reset token needs a valid expiration and should be rejected after it expires.' }, { id: 'duplicate-email', title: 'Repeated reset requests create duplicate emails', isBug: true, explanation: 'The flow should protect against duplicate sends and provide clear retry behavior.' }, { id: 'password-guidance', title: 'Password reset accepts weak credentials without guidance', isBug: true, explanation: 'Requirements and useful validation feedback are needed before the password is accepted.' }, { id: 'email-delay', title: 'Reset email arrives after a few seconds', isBug: false, explanation: 'A brief delivery delay alone is not a defect unless it violates a stated service expectation.' }] },
  { label: 'PAYMENT INCIDENT', level: 'ADVANCED', title: 'Trace the incident, not just the symptom.', brief: 'Use the simulated customer checkout and investigation console to separate a visible symptom from the risks underneath it.', actions: [['Submit the EU checkout', 'The UI says “Payment failed,” but the payment service response is 201 Authorized.'], ['Retry after the timeout', 'The second attempt produces a second authorization with the same customer and cart ID.'], ['Compare feature flags', 'EU has the new checkout flag enabled, but a cached response serves the old flag for some sessions.'], ['Open payment help', 'The fallback payment dialog opens with focus behind the modal.']], findings: [{ id: 'false-failure', title: 'Successful payment is presented as a failed payment', isBug: true, explanation: 'The UI and service state disagree, which can cause duplicate attempts and customer confusion.' }, { id: 'duplicate-charge', title: 'Retry after timeout creates a second authorization', isBug: true, explanation: 'The payment workflow needs idempotency to prevent duplicate charges during uncertain network outcomes.' }, { id: 'flag-cache', title: 'Feature flag is cached inconsistently across sessions', isBug: true, explanation: 'Inconsistent rollout state creates unreliable behavior and makes incident investigation harder.' }, { id: 'modal-focus', title: 'Fallback payment dialog leaves keyboard focus behind the modal', isBug: true, explanation: 'A modal must manage focus so keyboard and assistive-technology users can complete or exit the flow.' }, { id: 'healthy-api', title: 'Payment API returns a successful response', isBug: false, explanation: 'This is evidence, not a defect by itself. The problem is the mismatch between payment success and the customer-facing result.' }] },
]

function PasswordRecoveryDemo() {
  const [email, setEmail] = useState('unknown@example.com')
  const [message, setMessage] = useState('')
  const [showReset, setShowReset] = useState(false)
  const [password, setPassword] = useState('password')
  const [saved, setSaved] = useState(false)

  const requestReset = () => setMessage(email.includes('unknown') ? 'No account exists for that email address.' : 'Reset email sent. Check your inbox.')

  return <section className="demo-screen" aria-label="Password recovery demo">
    <div className="demo-screen-bar"><span>Northstar Account</span><i>DEMO SCREEN</i></div>
    <div className="demo-screen-body password-demo">
      <p className="eyebrow">ACCOUNT RECOVERY</p><h4>Reset your password</h4><p>Enter your email address and we’ll send a reset link.</p>
      <label>Email address<input value={email} onChange={(event) => { setEmail(event.target.value); setMessage('') }} /></label>
      <button type="button" onClick={requestReset}>Send reset link</button>
      {message && <p className="demo-status">{message}</p>}
      <div className="demo-divider"><span>Test link behavior</span></div>
      <button type="button" className="demo-link" onClick={() => { setShowReset(true); setSaved(false) }}>Open expired reset link ↗</button>
      {showReset && <div className="reset-card"><b>Create a new password</b><label>New password<input value={password} onChange={(event) => { setPassword(event.target.value); setSaved(false) }} type="password" /></label><button type="button" onClick={() => setSaved(true)}>Save new password</button>{saved && <p className="demo-status">Password saved successfully.</p>}</div>}
    </div>
  </section>
}

function PaymentIncidentDemo() {
  const [attempts, setAttempts] = useState(0)
  const [cachedFlag, setCachedFlag] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const hasAttempt = attempts > 0

  return <section className="demo-screen" aria-label="Payment incident demo">
    <div className="demo-screen-bar"><span>Northstar Checkout</span><i>EU · DEMO SCREEN</i></div>
    <div className="demo-screen-body payment-demo">
      <div className="checkout-demo-summary"><div><b>Studio headphones</b><span>1 item · €129.00</span></div><strong>€129.00</strong></div>
      <button type="button" className="demo-pay" onClick={() => setAttempts((count) => count + 1)}>{hasAttempt ? 'Try payment again' : 'Pay €129.00'}</button>
      {hasAttempt && <p className="payment-error">Payment failed. Please try again.</p>}
      <div className="investigation-console"><p className="eyebrow">INVESTIGATION CONSOLE</p><p><span>Payment service</span><b>201 Authorized</b></p><p><span>Authorization count</span><b className={attempts > 1 ? 'demo-risk' : ''}>{attempts || 0}</b></p><p><span>Checkout flag</span><b>{cachedFlag ? 'Old cached value' : 'New checkout enabled'}</b></p><button type="button" className="demo-link" onClick={() => setCachedFlag((value) => !value)}>Switch session / compare flag ↗</button></div>
      <button type="button" className="demo-link" onClick={() => setShowHelp(true)}>Open payment help ↗</button>
      {showHelp && <div className="payment-help"><b>Need help with your payment?</b><p>Try another method or contact support.</p><button type="button" onClick={() => setShowHelp(false)}>Close</button></div>}
    </div>
  </section>
}

export function AdvancedBugHunts({ challengeIndex }: { challengeIndex: number }) {
  const [evidence, setEvidence] = useState<number[]>([])
  const [reported, setReported] = useState<string[]>([])
  const challenge = challenges[challengeIndex] ?? challenges[0]
  const [findingOrder, setFindingOrder] = useState(() => shuffle(challenge.findings))
  const trueFindings = challenge.findings.filter((finding) => finding.isBug)
  const found = reported.filter((id) => challenge.findings.find((finding) => finding.id === id)?.isBug).length
  useEffect(() => { setEvidence([]); setReported([]); setFindingOrder(shuffle(challenge.findings)) }, [challengeIndex])

  return <section className="advanced-hunts"><div className="advanced-hunt-header"><p className="eyebrow">{challenge.level} BUG HUNT</p><h3>{challenge.title}</h3><p>{challenge.brief}</p></div><div className="advanced-hunt-demo">{challengeIndex === 0 ? <PasswordRecoveryDemo /> : <PaymentIncidentDemo />}</div><div className="advanced-hunt-grid"><div className="evidence-panel"><p className="eyebrow">INVESTIGATE</p>{challenge.actions.map(([action, result], index) => <article key={action}><button type="button" onClick={() => setEvidence((current) => current.includes(index) ? current : [...current, index])}>{action} <span>↗</span></button>{evidence.includes(index) && <p>{result}</p>}</article>)}</div><div className="finding-panel"><p className="eyebrow">LOG FINDINGS · {found}/{trueFindings.length}</p>{findingOrder.map((finding) => <button type="button" key={finding.id} className={reported.includes(finding.id) ? (finding.isBug ? 'reported' : 'guess') : ''} onClick={() => setReported((current) => current.includes(finding.id) ? current : [...current, finding.id])}><span>{reported.includes(finding.id) ? (finding.isBug ? 'FOUND' : 'NOT A DEFECT') : 'LOG'}</span><b>{finding.title}</b>{reported.includes(finding.id) && <small>{finding.explanation}</small>}</button>)}</div></div></section>
}
