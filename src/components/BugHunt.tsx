import { useMemo, useState } from 'react'

type BugId = 'cart-total' | 'promo-code' | 'express-shipping' | 'email-validation' | 'duplicate-order'
type DecoyId = 'default-quantity' | 'free-standard-shipping'
type ReportId = BugId | DecoyId

const bugs: Array<{ id: BugId; label: string; title: string; expected: string; actual: string; tip: string }> = [
  { id: 'cart-total', label: 'Cart total', title: 'Cart total does not update when quantity changes', expected: 'The subtotal, total, and item count reflect the selected quantity.', actual: 'The quantity changes, but the subtotal and total remain the same.', tip: 'Try increasing the quantity.' },
  { id: 'promo-code', label: 'Promo code', title: 'Valid discount code shows success without reducing the total', expected: 'A successful WELCOME10 code reduces the order total by 10%.', actual: 'The page confirms the code was applied, but the total does not change.', tip: 'Apply WELCOME10 and compare the total.' },
  { id: 'express-shipping', label: 'Shipping', title: 'Express shipping is selected without changing the order total', expected: 'Selecting express shipping adds its stated cost to the order total.', actual: 'The express option is selected, but shipping and total still show as free.', tip: 'Select express shipping and check the summary.' },
  { id: 'email-validation', label: 'Email validation', title: 'Checkout accepts an invalid email address', expected: 'Checkout blocks submission and explains how to enter a valid email address.', actual: 'An invalid email address can be used to submit an order.', tip: 'Try an email without an @ symbol.' },
  { id: 'duplicate-order', label: 'Checkout', title: 'Checkout can submit the same order more than once', expected: 'After the first submission, checkout prevents duplicate orders while processing.', actual: 'Selecting Place order again submits another order instead of preventing a duplicate.', tip: 'Select Place order twice.' },
]

const decoys: Array<{ id: DecoyId; title: string; expected: string; actual: string; explanation: string }> = [
  { id: 'default-quantity', title: 'Product quantity defaults to one', expected: 'A new cart can reasonably begin with one item.', actual: 'The cart starts with one item.', explanation: 'This is expected behavior, not a defect. A tester should report a mismatch with a requirement or meaningful user risk.' },
  { id: 'free-standard-shipping', title: 'Standard shipping is free', expected: 'A store may intentionally offer free standard shipping.', actual: 'Standard shipping is shown as free.', explanation: 'This is a business decision, not a defect, unless a requirement says shipping should be charged.' },
]

const reportOptions = [...bugs, ...decoys]

export function BugHunt() {
  const [quantity, setQuantity] = useState(1)
  const [code, setCode] = useState('')
  const [promoState, setPromoState] = useState<'idle' | 'applied' | 'invalid'>('idle')
  const [expressShipping, setExpressShipping] = useState(false)
  const [email, setEmail] = useState('customer@example.com')
  const [orderCount, setOrderCount] = useState(0)
  const [reportOpen, setReportOpen] = useState(false)
  const [selectedBug, setSelectedBug] = useState<ReportId>('cart-total')
  const [reported, setReported] = useState<BugId[]>([])
  const [incorrectReports, setIncorrectReports] = useState<DecoyId[]>([])
  const [showReview, setShowReview] = useState(false)

  const reportedCount = reported.length
  const status = useMemo(() => orderCount === 0 ? 'Ready to place your order.' : orderCount === 1 ? 'Order submitted. Select again to test duplicate protection.' : `Order submitted ${orderCount} times.`, [orderCount])

  const submitReport = () => {
    if (bugs.some((bug) => bug.id === selectedBug)) {
      const bugId = selectedBug as BugId
      setReported((current) => current.includes(bugId) ? current : [...current, bugId])
    } else {
      const decoyId = selectedBug as DecoyId
      setIncorrectReports((current) => current.includes(decoyId) ? current : [...current, decoyId])
    }
    setReportOpen(false)
  }

  const reset = () => {
    setQuantity(1); setCode(''); setPromoState('idle'); setExpressShipping(false); setEmail('customer@example.com'); setOrderCount(0); setReportOpen(false); setReported([]); setIncorrectReports([]); setShowReview(false)
  }

  return <div className="bug-hunt-panel">
    <div className="bug-hunt-intro"><div><p className="eyebrow">BUG HUNT · CHECKOUT</p><h2>Find the bugs.<br /><em>Report what matters.</em></h2><p>Explore this mock checkout as if it were ready for release. There are five intentional defects. Use the product, then log the issues you find.</p></div><div className="bug-hunt-progress"><span>{reportedCount}/5</span><p>bugs reported</p><button type="button" onClick={() => setShowReview(true)}>Review findings ↗</button></div></div>

    <div className="bug-hunt-workspace">
      <section className="checkout-mock" aria-label="Checkout bug hunt simulation">
        <div className="checkout-top"><span>DEMO SHOP</span><span>Secure checkout</span></div>
        <div className="checkout-body"><div className="checkout-product"><div className="product-art" aria-hidden="true">◒</div><div><h3>Focus Desk Lamp</h3><p>Warm white · adjustable arm</p><strong>$89.99</strong></div><div className="quantity-control"><button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Decrease quantity">−</button><output aria-label="Quantity">{quantity}</output><button type="button" onClick={() => setQuantity((current) => current + 1)} aria-label="Increase quantity">+</button></div></div>
          <div className="promo-control"><label htmlFor="promo-code">PROMO CODE</label><div><input id="promo-code" value={code} onChange={(event) => { setCode(event.target.value); setPromoState('idle') }} placeholder="Try WELCOME10" /><button type="button" onClick={() => setPromoState(code.trim().toUpperCase() === 'WELCOME10' ? 'applied' : 'invalid')}>Apply</button></div>{promoState === 'applied' && <p className="promo-success">WELCOME10 applied — 10% off your order.</p>}{promoState === 'invalid' && <p className="promo-error">That code could not be applied.</p>}</div>
          <label className="delivery-option"><input type="checkbox" checked={expressShipping} onChange={(event) => setExpressShipping(event.target.checked)} /><span><b>Express shipping</b><small>Arrives tomorrow · $12.99</small></span></label>
          <label className="checkout-email" htmlFor="checkout-email">EMAIL FOR ORDER UPDATES<input id="checkout-email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <dl className="checkout-total"><div><dt>Items ({quantity})</dt><dd>$89.99</dd></div><div><dt>Shipping</dt><dd>Free</dd></div><div className="total-row"><dt>Total</dt><dd>$89.99</dd></div></dl>
          <button type="button" className="checkout-button" onClick={() => setOrderCount((current) => current + 1)}>Place order <span>→</span></button><p className={orderCount > 1 ? 'checkout-status attention' : 'checkout-status'} role="status">{status}</p>
        </div>
      </section>

      <aside className="bug-report-card"><p className="eyebrow">TESTER NOTES</p><h3>What did you find?</h3><p>Look for behavior that differs from what a customer would reasonably expect.</p><ul>{bugs.map((bug) => <li key={bug.id}><span className={reported.includes(bug.id) ? 'found' : ''}>{reported.includes(bug.id) ? '✓' : '○'}</span>{reported.includes(bug.id) ? `${bug.label} reported` : bug.tip}</li>)}</ul><button type="button" onClick={() => setReportOpen(true)}>Log a bug <span>↗</span></button><button type="button" className="bug-reset" onClick={reset}>Reset scenario</button></aside>
    </div>

    {reportOpen && <div className="bug-modal-backdrop" role="presentation" onMouseDown={() => setReportOpen(false)}><section className="bug-report-modal" role="dialog" aria-modal="true" aria-labelledby="bug-report-title" onMouseDown={(event) => event.stopPropagation()}><button className="bug-modal-close" type="button" aria-label="Close report form" onClick={() => setReportOpen(false)}>×</button><p className="eyebrow">NEW BUG REPORT</p><h3 id="bug-report-title">Capture the behavior.</h3><p>Choose the issue that best matches what you observed. A few choices are intentionally not defects—use the product evidence before you report.</p><label htmlFor="bug-selection">OBSERVED ISSUE</label><select id="bug-selection" value={selectedBug} onChange={(event) => setSelectedBug(event.target.value as ReportId)}>{reportOptions.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select><div className="bug-report-preview"><span>EXPECTED</span><p>{reportOptions.find((item) => item.id === selectedBug)?.expected}</p><span>ACTUAL</span><p>{reportOptions.find((item) => item.id === selectedBug)?.actual}</p></div><button type="button" className="button primary" onClick={submitReport}>{reported.includes(selectedBug as BugId) || incorrectReports.includes(selectedBug as DecoyId) ? 'Already reported' : 'Submit bug report'} <span>↗</span></button></section></div>}

    {showReview && <div className="bug-modal-backdrop" role="presentation" onMouseDown={() => setShowReview(false)}><section className="bug-report-modal bug-review-modal" role="dialog" aria-modal="true" aria-labelledby="bug-review-title" onMouseDown={(event) => event.stopPropagation()}><button className="bug-modal-close" type="button" aria-label="Close review" onClick={() => setShowReview(false)}>×</button><p className="eyebrow">BUG HUNT REVIEW · {reportedCount}/5 FOUND{incorrectReports.length ? ` · ${incorrectReports.length} GUESS${incorrectReports.length === 1 ? '' : 'ES'}` : ''}</p><h3 id="bug-review-title">{reportedCount === 5 ? 'Great investigation.' : 'Keep exploring.'}</h3><p>Good QA is not only about finding an issue—it is about describing its impact and making it easy for the team to act.</p><div className="bug-review-list">{bugs.map((bug) => <article key={bug.id} className={reported.includes(bug.id) ? 'reported' : ''}><span>{reported.includes(bug.id) ? 'FOUND' : 'MISSED'}</span><h4>{bug.title}</h4><p><b>Expected:</b> {bug.expected}</p><p><b>Actual:</b> {bug.actual}</p></article>)}{incorrectReports.map((id) => { const decoy = decoys.find((item) => item.id === id); return decoy ? <article className="incorrect-report" key={decoy.id}><span>NOT A DEFECT</span><h4>{decoy.title}</h4><p>{decoy.explanation}</p></article> : null })}</div><button type="button" className="button primary" onClick={() => setShowReview(false)}>Continue practicing ↗</button></section></div>}
  </div>
}
