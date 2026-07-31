import './styles.css'
import './glass.css'
import './systems.css'
import './complexity.css'

const products = [
  { id: 'focus-lamp', name: 'Focus Desk Lamp', category: 'desk', price: 89.99, detail: 'Adjustable warm-white light for focused work.' },
  { id: 'mechanical-keyboard', name: 'Quiet Mechanical Keyboard', category: 'desk', price: 129.99, detail: 'Compact layout with low-profile switches.' },
  { id: 'travel-hub', name: 'Travel USB-C Hub', category: 'travel', price: 49.99, detail: 'HDMI, USB-A, and card reader in one hub.' },
  { id: 'cable-kit', name: 'Cable Kit', category: 'travel', price: 19.99, detail: 'Short, labeled cables for a clean travel setup.' },
]

const employees = [
  { name: 'Jordan Ellis', team: 'Customer Operations', role: 'Support Specialist' },
  { name: 'Casey Morgan', team: 'Customer Operations', role: 'Operations Manager' },
  { name: 'Riley Chen', team: 'People Operations', role: 'HR Business Partner' },
  { name: 'Avery Brooks', team: 'Engineering', role: 'Quality Engineer' },
  { name: 'Morgan Diaz', team: 'Finance', role: 'Financial Analyst' },
]

const state = { cart: [], promo: '', signedIn: false, search: '', category: 'all' }
const advancedState = {
  checking: 4280.18,
  savings: 760,
  ptoDays: 11,
  nextClaim: 10504,
  cardFrozen: false,
  purchaseAlerts: true,
  pendingTransfer: null,
  transactions: [
    { status: 'Pending', detail: '−$62.44 · City Electric utility payment' },
    { status: 'Posted', detail: '+$1,240.00 · Direct deposit' },
    { status: 'Posted', detail: '−$48.17 · Fresh Market' },
  ],
  bills: [{ status: 'Scheduled', detail: '$62.44 · City Electric · Aug 15' }],
}
const byId = (id) => document.getElementById(id)
const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
const viewIds = ['lab-directory', 'banking-view', 'claims-view', 'hr-view', 'retail-view']

function openView(viewId, updateHash = true) {
  const nextView = viewIds.includes(viewId) ? viewId : 'lab-directory'
  document.querySelectorAll('.demo-view').forEach((view) => { view.hidden = view.id !== nextView })
  if (updateHash) window.location.hash = nextView === 'lab-directory' ? '' : nextView
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function totals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = state.promo === 'WELCOME10' ? subtotal * 0.1 : 0
  return { subtotal, discount, total: subtotal - discount }
}

function renderProducts() {
  const query = state.search.toLowerCase()
  const visible = products.filter((product) => (state.category === 'all' || product.category === state.category) && `${product.name} ${product.detail}`.toLowerCase().includes(query))
  byId('result-count').textContent = `${visible.length} product${visible.length === 1 ? '' : 's'}`
  byId('products').innerHTML = visible.map((product) => `
    <article class="product-card" data-testid="product-${product.id}">
      <span class="product-icon">◒</span><p>${product.category.toUpperCase()}</p><h3>${product.name}</h3><span>${product.detail}</span>
      <div><strong>${money(product.price)}</strong><button type="button" data-add="${product.id}" data-testid="add-${product.id}">Add to cart</button></div>
    </article>`).join('') || '<p class="empty">No products match this search.</p>'
}

function renderEmployeeDirectory(query = '') {
  const normalizedQuery = query.trim().toLowerCase()
  const matches = employees.filter((employee) => `${employee.name} ${employee.team} ${employee.role}`.toLowerCase().includes(normalizedQuery))
  byId('employee-result-count').textContent = `${matches.length} employee${matches.length === 1 ? '' : 's'} found`
  byId('employee-results').innerHTML = matches.length
    ? matches.map((employee) => `<li><b>${employee.name}</b><span>${employee.role} · ${employee.team}</span></li>`).join('')
    : '<li><span>No employees match that search.</span></li>'
}

function renderCart() {
  byId('cart-count').textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0)
  byId('cart-items').innerHTML = state.cart.length ? state.cart.map((item) => `
    <article class="cart-item" data-testid="cart-item-${item.id}"><div><h3>${item.name}</h3><p>${money(item.price)} each</p></div>
    <div class="quantity"><button type="button" data-change="${item.id}" data-delta="-1" aria-label="Decrease ${item.name}">−</button><output data-testid="quantity-${item.id}">${item.quantity}</output><button type="button" data-change="${item.id}" data-delta="1" aria-label="Increase ${item.name}">+</button></div><strong>${money(item.price * item.quantity)}</strong></article>`).join('') : '<p class="empty">Your cart is ready for a practice flow.</p>'
  const total = totals()
  byId('subtotal').textContent = money(total.subtotal)
  byId('discount').textContent = `−${money(total.discount)}`
  byId('total').textContent = money(total.total)
}

function setExperienceVisibility() {
  byId('shop-experience').hidden = !state.signedIn
  byId('shop-nav').hidden = !state.signedIn
  byId('cart-nav').hidden = !state.signedIn
}

function appendWorkItem(listId, label, detail) {
  const item = document.createElement('li')
  const title = document.createElement('b')
  const copy = document.createElement('span')
  title.textContent = label
  copy.textContent = detail
  item.append(title, copy)
  byId(listId).prepend(item)
}

function renderAdvancedApps() {
  byId('bank-checking').textContent = money(advancedState.checking)
  byId('bank-available').textContent = money(advancedState.checking)
  byId('bank-savings').textContent = money(advancedState.savings)
  byId('bank-card-state').textContent = advancedState.cardFrozen ? 'Frozen' : 'Active'
  byId('bank-alert-state').textContent = advancedState.purchaseAlerts ? 'On' : 'Off'
  byId('bank-card-toggle').textContent = advancedState.cardFrozen ? 'Unfreeze card' : 'Freeze card'
  byId('bank-alert-toggle').checked = advancedState.purchaseAlerts
  renderBankTransactions()
  byId('bank-bill-list').innerHTML = advancedState.bills.map((bill) => `<li><b>${bill.status}</b><span>${bill.detail}</span></li>`).join('')
  byId('pto-balance').textContent = `${advancedState.ptoDays} days`
}

function renderBankTransactions() {
  const filter = byId('bank-activity-filter').value
  const items = advancedState.transactions.filter((item) => filter === 'all' || item.status.toLowerCase() === filter)
  byId('bank-transactions').innerHTML = items.length
    ? items.map((item) => `<li><b>${item.status}</b><span>${item.detail}</span></li>`).join('')
    : '<li><span>No matching activity.</span></li>'
}

function addBankTransaction(status, detail) {
  advancedState.transactions.unshift({ status, detail })
}

function resetAdvancedApps() {
  Object.assign(advancedState, {
    checking: 4280.18,
    savings: 760,
    ptoDays: 11,
    nextClaim: 10504,
    cardFrozen: false,
    purchaseAlerts: true,
    pendingTransfer: null,
    transactions: [
      { status: 'Pending', detail: '−$62.44 · City Electric utility payment' },
      { status: 'Posted', detail: '+$1,240.00 · Direct deposit' },
      { status: 'Posted', detail: '−$48.17 · Fresh Market' },
    ],
    bills: [{ status: 'Scheduled', detail: '$62.44 · City Electric · Aug 15' }],
  })
  byId('claim-list').innerHTML = '<li><b>CLM-10482</b><span>Vehicle damage · Evidence requested</span></li><li><b>CLM-10491</b><span>Water damage · Manager review</span></li><li><b>CLM-10503</b><span>Property loss · New</span></li>'
  byId('time-off-list').innerHTML = '<li><b>Pending</b><span>Aug 18–20 · Vacation</span></li>'
  document.querySelectorAll('[data-system-form]').forEach((form) => {
    form.reset()
    form.querySelector('[role="status"]').textContent = ''
  })
  byId('bank-transfer-review').hidden = true
  byId('bank-confirm-transfer').hidden = true
  byId('bank-card-message').textContent = 'Card is ready for simulated purchases.'
  renderAdvancedApps()
}

function resetDemo() {
  Object.assign(state, { cart: [], promo: '', signedIn: false, search: '', category: 'all' })
  byId('promo').value = ''
  byId('product-search').value = ''
  byId('employee-search').value = ''
  byId('login-form').reset()
  byId('checkout-form').reset()
  for (const id of ['promo-message', 'login-message', 'checkout-message']) byId(id).textContent = ''
  document.querySelector('input[name="category"][value="all"]').checked = true
  resetAdvancedApps(); setExperienceVisibility(); renderProducts(); renderCart(); renderEmployeeDirectory(); openView('lab-directory')
}

document.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof HTMLElement)) return
  const viewButton = target.closest('[data-open-view]')
  if (viewButton instanceof HTMLElement) {
    openView(viewButton.dataset.openView)
    return
  }
  if (target.dataset.add) {
    const product = products.find((item) => item.id === target.dataset.add)
    const existing = state.cart.find((item) => item.id === product.id)
    if (existing) existing.quantity += 1
    else state.cart.push({ ...product, quantity: 1 })
    renderCart()
  }
  if (target.dataset.change) {
    const item = state.cart.find((cartItem) => cartItem.id === target.dataset.change)
    item.quantity += Number(target.dataset.delta)
    if (item.quantity <= 0) state.cart = state.cart.filter((cartItem) => cartItem.id !== item.id)
    renderCart()
  }
  if (target.id === 'clear-cart') { state.cart = []; renderCart() }
  if (target.id === 'reset-demo') resetDemo()
})

byId('product-search').addEventListener('input', (event) => { state.search = event.target.value; renderProducts() })
byId('employee-search').addEventListener('input', (event) => renderEmployeeDirectory(event.target.value))
document.querySelectorAll('input[name="category"]').forEach((input) => input.addEventListener('change', (event) => { state.category = event.target.value; renderProducts() }))
byId('login-form').addEventListener('submit', (event) => {
  event.preventDefault()
  state.signedIn = byId('login-email').value === 'tester@itswatts.demo' && byId('login-password').value === 'DemoPass123!'
  byId('login-message').textContent = state.signedIn ? 'Signed in. The shop is now unlocked.' : 'Use the documented demo credentials.'
  setExperienceVisibility()
  if (state.signedIn) byId('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' })
})
byId('apply-promo').addEventListener('click', () => { state.promo = byId('promo').value.trim().toUpperCase() === 'WELCOME10' ? 'WELCOME10' : ''; byId('promo-message').textContent = state.promo ? 'WELCOME10 applied: 10% off.' : 'That demo code is not available.'; renderCart() })
byId('checkout-form').addEventListener('submit', (event) => { event.preventDefault(); byId('checkout-message').textContent = state.cart.length ? `Demo order placed for ${money(totals().total)}. No payment was processed.` : 'Add at least one item before checkout.' })
byId('bank-activity-filter').addEventListener('change', renderBankTransactions)
byId('bank-alert-toggle').addEventListener('change', (event) => {
  advancedState.purchaseAlerts = event.target.checked
  byId('bank-alert-state').textContent = advancedState.purchaseAlerts ? 'On' : 'Off'
  byId('bank-card-message').textContent = advancedState.purchaseAlerts ? 'Purchase alerts are turned on.' : 'Purchase alerts are turned off.'
})
byId('bank-card-toggle').addEventListener('click', () => {
  advancedState.cardFrozen = !advancedState.cardFrozen
  renderAdvancedApps()
  byId('bank-card-message').textContent = advancedState.cardFrozen
    ? 'Card frozen. A card payment would be blocked until it is restored.'
    : 'Card restored. Simulated purchases can continue.'
})
byId('bank-confirm-transfer').addEventListener('click', () => {
  const transfer = advancedState.pendingTransfer
  if (!transfer) return
  advancedState[transfer.from] -= transfer.amount
  advancedState[transfer.to] += transfer.amount
  addBankTransaction('Posted', `${transfer.from === 'checking' ? 'Checking' : 'Savings'} → ${transfer.to === 'checking' ? 'Checking' : 'Savings'} · ${money(transfer.amount)}`)
  advancedState.pendingTransfer = null
  byId('bank-transfer-review').hidden = true
  byId('bank-confirm-transfer').hidden = true
  byId('bank-transfer').reset()
  byId('bank-transfer').querySelector('[role="status"]').textContent = `Transfer posted. ${money(transfer.amount)} moved successfully.`
  renderAdvancedApps()
})

document.querySelectorAll('[data-system-form]').forEach((form) => form.addEventListener('submit', (event) => {
  event.preventDefault()
  const status = form.querySelector('[role="status"]')

  if (form.dataset.systemForm === 'bank-transfer') {
    const amount = Number(byId('bank-amount').value)
    const from = byId('bank-from').value
    const to = byId('bank-to').value
    if (!Number.isFinite(amount) || amount <= 0) { status.textContent = 'Enter a transfer amount greater than $0.00.'; return }
    if (from === to) { status.textContent = 'Choose two different accounts.'; return }
    if (advancedState[from] < amount) { status.textContent = 'Transfer declined: insufficient available balance.'; return }
    advancedState.pendingTransfer = { from, to, amount }
    byId('bank-transfer-review').textContent = `Review: move ${money(amount)} from ${from === 'checking' ? 'Everyday checking' : 'Vacation savings'} to ${to === 'checking' ? 'Everyday checking' : 'Vacation savings'}.`
    byId('bank-transfer-review').hidden = false
    byId('bank-confirm-transfer').hidden = false
    status.textContent = 'Review the transfer, then select Confirm transfer.'
    return
  }

  if (form.dataset.systemForm === 'bill-payment') {
    const amount = Number(byId('bank-payment-amount').value)
    const date = byId('bank-payment-date').value
    if (!Number.isFinite(amount) || amount <= 0) { status.textContent = 'Enter a payment amount greater than $0.00.'; return }
    if (!date) { status.textContent = 'Choose a delivery date.'; return }
    if (advancedState.cardFrozen) { status.textContent = 'Payment blocked: the simulated debit card is frozen.'; return }
    const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const payee = byId('bank-payee').value
    advancedState.bills.unshift({ status: 'Scheduled', detail: `${money(amount)} · ${payee} · ${formattedDate}` })
    addBankTransaction('Pending', `−${money(amount)} · ${payee} payment scheduled`)
    form.reset()
    status.textContent = `${money(amount)} payment scheduled for ${formattedDate}.`
    renderAdvancedApps()
    return
  }

  if (form.dataset.systemForm === 'deposit') {
    const amount = Number(byId('bank-deposit-amount').value)
    const account = byId('bank-deposit-account').value
    if (!Number.isFinite(amount) || amount <= 0) { status.textContent = 'Enter a deposit amount greater than $0.00.'; return }
    advancedState[account] += amount
    addBankTransaction('Posted', `+${money(amount)} · Demo deposit to ${account === 'checking' ? 'checking' : 'savings'}`)
    form.reset()
    status.textContent = `Demo deposit posted to ${account}.`
    renderAdvancedApps()
    return
  }

  if (form.dataset.systemForm === 'claim-intake') {
    const claimId = `CLM-${advancedState.nextClaim++}`
    const type = byId('claim-type').value
    const priority = byId('claim-priority').value
    appendWorkItem('claim-list', claimId, `${type} · New · ${priority} priority`)
    form.reset()
    status.textContent = `${claimId} saved as a new claim. No external notification was sent.`
    return
  }

  const start = new Date(`${byId('leave-start').value}T00:00:00`)
  const end = new Date(`${byId('leave-end').value}T00:00:00`)
  const days = Math.floor((end - start) / 86400000) + 1
  if (!Number.isFinite(days) || days <= 0) { status.textContent = 'Choose an end date on or after the start date.'; return }
  if (days > advancedState.ptoDays) { status.textContent = 'Request exceeds the available PTO balance.'; return }
  advancedState.ptoDays -= days
  appendWorkItem('time-off-list', 'Pending', `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${byId('leave-reason').value} · ${days} day${days === 1 ? '' : 's'}`)
  renderAdvancedApps()
  form.reset()
  status.textContent = 'Time-off request submitted for manager review.'
}))

window.addEventListener('hashchange', () => openView(window.location.hash.slice(1), false))

setExperienceVisibility(); renderProducts(); renderCart(); renderAdvancedApps(); renderEmployeeDirectory()
openView(window.location.hash.slice(1), false)
