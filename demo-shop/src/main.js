import './styles.css'
import './glass.css'
import './systems.css'
import './complexity.css'
import './theme.css'
import './brand.css'

const products = [
  { id: 'focus-lamp', name: 'Focus Desk Lamp', category: 'desk', price: 89.99, detail: 'Adjustable warm-white light for focused work.' },
  { id: 'mechanical-keyboard', name: 'Quiet Mechanical Keyboard', category: 'desk', price: 129.99, detail: 'Compact layout with low-profile switches.' },
  { id: 'travel-hub', name: 'Travel USB-C Hub', category: 'travel', price: 49.99, detail: 'HDMI, USB-A, and card reader in one hub.' },
  { id: 'cable-kit', name: 'Cable Kit', category: 'travel', price: 19.99, detail: 'Short, labeled cables for a clean travel setup.' },
]

const employees = [
  { id: 'jordan-ellis', name: 'Jordan Ellis', team: 'Customer Operations', role: 'Support Specialist', manager: 'Casey Morgan', pto: '11 days' },
  { id: 'casey-morgan', name: 'Casey Morgan', team: 'Customer Operations', role: 'Operations Manager', manager: 'Riley Chen', pto: '14 days' },
  { id: 'riley-chen', name: 'Riley Chen', team: 'People Operations', role: 'HR Business Partner', manager: 'Morgan Diaz', pto: '16 days' },
  { id: 'avery-brooks', name: 'Avery Brooks', team: 'Engineering', role: 'Quality Engineer', manager: 'Taylor Reed', pto: '8 days' },
  { id: 'morgan-diaz', name: 'Morgan Diaz', team: 'Finance', role: 'Financial Analyst', manager: 'Taylor Reed', pto: '12 days' },
]

const state = { cart: [], promo: '', signedIn: false, search: '', category: 'all' }
let selectedEmployeeId = 'jordan-ellis'
const initialBankUsers = [
  { id: 'casey-morgan', name: 'Casey Morgan', type: 'Everyday customer', email: 'casey@itswatts.demo', phone: '555-0142', address: '142 Demo Lane', address2: '', city: 'Austin', state: 'TX', postal: '78701', country: 'United States', password: 'DemoPass123!', checking: 4280.18, savings: 760, transactions: [{ status: 'Pending', detail: '−$62.44 · City Electric utility payment' }, { status: 'Posted', detail: '+$1,240.00 · Direct deposit' }, { status: 'Posted', detail: '−$48.17 · Fresh Market' }], bills: [{ status: 'Scheduled', detail: '$62.44 · City Electric · Aug 15' }] },
  { id: 'alex-johnson', name: 'Alex Johnson', type: 'Overdraft-risk customer', email: 'alex@itswatts.demo', phone: '555-0191', address: '8 Practice Court', address2: 'Unit 4B', city: 'Dallas', state: 'TX', postal: '75201', country: 'United States', password: 'DemoPass123!', checking: 42.18, savings: 0, transactions: [{ status: 'Pending', detail: '−$58.40 · Northstar Internet payment' }, { status: 'Posted', detail: '+$620.00 · Weekly payroll' }, { status: 'Posted', detail: '−$535.18 · Rent payment' }], bills: [{ status: 'Scheduled', detail: '$58.40 · Northstar Internet · Aug 12' }] },
  { id: 'jordan-ellis-bank', name: 'Jordan Ellis', type: 'Joint-account holder', jointAccountId: 'ellis-household', jointCoOwner: 'Taylor Ellis', email: 'jordan@itswatts.demo', phone: '555-0116', address: '91 Shared Way', address2: '', city: 'Round Rock', state: 'TX', postal: '78664', country: 'United States', password: 'DemoPass123!', checking: 1260.44, savings: 3800, transactions: [{ status: 'Posted', detail: '+$2,850.00 · Joint direct deposit' }, { status: 'Posted', detail: '−$226.34 · Family groceries' }, { status: 'Pending', detail: '−$95.00 · Shared utility payment' }], bills: [{ status: 'Scheduled', detail: '$95.00 · City Electric · Aug 18' }] },
  { id: 'taylor-ellis-bank', name: 'Taylor Ellis', type: 'Joint-account holder', jointAccountId: 'ellis-household', jointCoOwner: 'Jordan Ellis', email: 'taylor@itswatts.demo', phone: '555-0117', address: '91 Shared Way', address2: '', city: 'Round Rock', state: 'TX', postal: '78664', country: 'United States', password: 'DemoPass123!', checking: 1260.44, savings: 3800, transactions: [{ status: 'Posted', detail: '+$2,850.00 · Joint direct deposit' }, { status: 'Posted', detail: '−$226.34 · Family groceries' }, { status: 'Pending', detail: '−$95.00 · Shared utility payment' }], bills: [{ status: 'Scheduled', detail: '$95.00 · City Electric · Aug 18' }] },
  { id: 'riley-chen-bank', name: 'Riley Chen', type: 'Small-business owner', email: 'riley@itswatts.demo', phone: '555-0188', address: '300 Market Street', address2: 'Suite 210', city: 'Houston', state: 'TX', postal: '77002', country: 'United States', password: 'DemoPass123!', checking: 12850.62, savings: 3400, transactions: [{ status: 'Posted', detail: '+$7,400.00 · Client invoice payment' }, { status: 'Posted', detail: '−$1,980.55 · Inventory purchase' }, { status: 'Posted', detail: '−$420.00 · Team travel' }], bills: [{ status: 'Scheduled', detail: '$420.00 · Harbor Insurance · Aug 22' }] },
]
const cloneBankUsers = () => initialBankUsers.map((user) => ({ ...user, transactions: user.transactions.map((transaction) => ({ ...transaction })), bills: user.bills.map((bill) => ({ ...bill })) }))
let bankUsers = cloneBankUsers()
const bankSession = { signedIn: false, userId: null }
const bankProfile = { ...bankUsers[0] }
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
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character])
const viewIds = ['lab-directory', 'banking-view', 'claims-view', 'hr-view', 'retail-view']

function setUpStateSelector() {
  const stateInput = byId('bank-profile-state')
  if (!(stateInput instanceof HTMLInputElement)) return
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']
  const stateSelect = document.createElement('select')
  stateSelect.id = stateInput.id
  stateSelect.autocomplete = stateInput.autocomplete
  stateSelect.setAttribute('aria-label', 'State')
  stateSelect.innerHTML = states.map((state) => `<option value="${state}">${state}</option>`).join('')
  stateSelect.value = stateInput.value || 'TX'
  stateInput.replaceWith(stateSelect)
}

function setDemoTheme(theme, save = true) {
  document.documentElement.dataset.theme = theme
  byId('demo-theme-toggle').textContent = theme === 'dark' ? '☼' : '☾'
  byId('demo-theme-toggle').setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`)
  if (save) localStorage.setItem('itswatts-demo-theme', theme)
}

function openView(viewId, updateHash = true) {
  const nextView = viewIds.includes(viewId) ? viewId : 'lab-directory'
  document.querySelectorAll('.demo-view').forEach((view) => { view.hidden = view.id !== nextView })
  if (updateHash) window.location.hash = nextView === 'lab-directory' ? '' : nextView
  if (nextView === 'banking-view') setBankExperienceVisibility()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function showBankPanel(panelId) {
  if (!bankSession.signedIn) return
  const panel = byId(panelId)
  if (!panel) return
  document.querySelectorAll('[data-bank-panel]').forEach((item) => { item.hidden = (item.dataset.bankPanel || item.id) !== panelId })
  document.querySelectorAll('[data-bank-target]').forEach((button) => button.classList.toggle('active', button.dataset.bankTarget === panelId))
}

function currentBankUser() {
  return bankUsers.find((user) => user.id === bankSession.userId)
}

function setBankExperienceVisibility() {
  byId('bank-login-panel').hidden = bankSession.signedIn
  byId('bank-workspace').hidden = !bankSession.signedIn
  byId('bank-logout').hidden = !bankSession.signedIn
  if (bankSession.signedIn) showBankPanel('bank-dashboard')
  else document.querySelectorAll('[data-bank-panel]').forEach((item) => { item.hidden = true })
}

function applyBankUser(user) {
  if (!user) return
  bankSession.signedIn = true
  bankSession.userId = user.id
  Object.assign(bankProfile, user)
  advancedState.checking = user.checking
  advancedState.savings = user.savings
  advancedState.transactions = user.transactions.map((transaction) => ({ ...transaction }))
  advancedState.bills = user.bills.map((bill) => ({ ...bill }))
  renderAdvancedApps()
  renderBankProfile()
  setBankExperienceVisibility()
}

function syncJointAccount(user) {
  if (!user?.jointAccountId) return
  bankUsers.filter((member) => member.jointAccountId === user.jointAccountId && member.id !== user.id).forEach((member) => {
    Object.assign(member, {
      checking: user.checking,
      savings: user.savings,
      transactions: user.transactions.map((transaction) => ({ ...transaction })),
      bills: user.bills.map((bill) => ({ ...bill })),
    })
  })
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
    ? matches.map((employee) => `<li><button type="button" class="employee-result${employee.id === selectedEmployeeId ? ' selected' : ''}" data-select-employee="${employee.id}"><b>${employee.name}</b><span>${employee.role} · ${employee.team}</span></button></li>`).join('')
    : '<li><span>No employees match that search.</span></li>'
}

function renderEmployeeProfile() {
  const employee = employees.find((item) => item.id === selectedEmployeeId) || employees[0]
  byId('employee-profile-name').textContent = employee.name
  byId('employee-profile-team').textContent = employee.team
  byId('employee-profile-role').textContent = employee.role
  byId('employee-profile-manager').textContent = employee.manager
  byId('pto-balance').textContent = employee.id === 'jordan-ellis' ? `${advancedState.ptoDays} days` : employee.pto
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
  const netWorth = advancedState.checking + advancedState.savings
  const netChange = netWorth - 5040.18
  const transactionTotals = advancedState.transactions.reduce((totals, transaction) => {
    const amount = Number(transaction.detail.match(/\$([\d,.]+)/)?.[1]?.replace(',', '') || 0)
    if (transaction.detail.startsWith('+')) totals.income += amount
    if (transaction.detail.startsWith('−')) totals.expenses += amount
    return totals
  }, { income: 0, expenses: 0 })
  byId('bank-net-worth').textContent = money(netWorth)
  byId('bank-net-change').textContent = `${netChange >= 0 ? '+' : '−'}${money(Math.abs(netChange))}`
  byId('bank-income').textContent = `+${money(transactionTotals.income)}`
  byId('bank-expenses').textContent = `−${money(transactionTotals.expenses)}`
  const user = currentBankUser()
  if (user) {
    Object.assign(user, { checking: advancedState.checking, savings: advancedState.savings, transactions: advancedState.transactions.map((transaction) => ({ ...transaction })), bills: advancedState.bills.map((bill) => ({ ...bill })) })
    syncJointAccount(user)
  }
  renderEmployeeProfile()
}

function renderBankProfile() {
  byId('bank-profile-title').textContent = bankProfile.name
  byId('bank-profile-name').value = bankProfile.name
  byId('bank-profile-email').value = bankProfile.email
  byId('bank-profile-phone').value = bankProfile.phone
  byId('bank-profile-address').value = bankProfile.address
  byId('bank-profile-address2').value = bankProfile.address2
  byId('bank-profile-city').value = bankProfile.city
  byId('bank-profile-state').value = bankProfile.state
  byId('bank-profile-postal').value = bankProfile.postal
  byId('bank-profile-country').value = bankProfile.country
  byId('bank-profile-type').textContent = bankProfile.jointCoOwner ? `${bankProfile.type} · Shared with ${bankProfile.jointCoOwner}` : bankProfile.type
  byId('bank-account-ownership').textContent = bankProfile.jointCoOwner ? `JOINT OWNERS · ${bankProfile.name.toUpperCase()} + ${bankProfile.jointCoOwner.toUpperCase()}` : 'INDIVIDUAL OWNER · PERSONAL ACCOUNTS'
  byId('banking-title').textContent = `Welcome back, ${bankProfile.name.split(' ')[0]}.`
}

function renderBankTransactions() {
  const filter = byId('bank-activity-filter').value
  const items = advancedState.transactions.filter((item) => filter === 'all' || item.status.toLowerCase() === filter)
  byId('bank-transactions').innerHTML = items.length
    ? items.map((item) => `<li><b>${item.status}</b><span>${escapeHtml(item.detail)}</span></li>`).join('')
    : '<li><span>No matching activity.</span></li>'
  byId('bank-dashboard-transactions').innerHTML = advancedState.transactions.slice(0, 5).map((item, index) => {
    const amount = item.detail.match(/[+−]\$[\d,.]+/)?.[0] || '—'
    const description = item.detail.replace(/[+−]\$[\d,.]+ ·\s*/, '')
    const category = item.status === 'Pending' ? 'Scheduled' : amount.startsWith('+') ? 'Income' : 'Spending'
    return `<tr><td>${index === 0 ? 'Today' : `${index + 1} days ago`}</td><td>${escapeHtml(description)}</td><td><span class="transaction-category ${category.toLowerCase()}">${category}</span></td><td class="${amount.startsWith('+') ? 'positive' : 'negative'}">${amount}</td></tr>`
  }).join('')
}

function addBankTransaction(status, detail) {
  advancedState.transactions.unshift({ status, detail })
}

const bankTestCases = {
  'valid-login': { name: 'Valid credentials unlock the workspace', skipSignIn: true, steps: "await signIn(page);\n  await expect(page.getByText('Quick actions')).toBeVisible();" },
  'invalid-login': { name: 'Invalid credentials keep the workspace protected', skipSignIn: true, steps: "await page.locator('#bank-login-email').fill('not-a-user@itswatts.demo');\n  await page.locator('#bank-login-password').fill('incorrect');\n  await page.getByTestId('bank-sign-in').click();\n  await expect(page.locator('#bank-login-message')).toContainText('do not match');\n  await expect(page.locator('#bank-workspace')).toBeHidden();" },
  'profile-switch': { name: 'Different profiles display their banking scenarios', skipSignIn: true, steps: "await page.getByRole('button', { name: /Alex Johnson/ }).click();\n  await page.getByTestId('bank-sign-in').click();\n  await expect(page.getByRole('heading', { name: 'Welcome back, Alex.' })).toBeVisible();" },
  'joint-account': { name: 'Joint account holders share balances and activity', skipSignIn: true, steps: "await signIn(page, 'jordan@itswatts.demo');\n  await page.getByRole('button', { name: 'Send money' }).click();\n  await page.locator('#bank-recipient').fill('Morgan Lee');\n  await page.locator('#bank-send-amount').fill('25');\n  await page.getByTestId('send-money').click();\n  await page.getByRole('button', { name: 'Log out' }).click();\n  await signIn(page, 'taylor@itswatts.demo');\n  await expect(page.getByText('Payment sent to Morgan Lee')).toBeVisible();" },
  logout: { name: 'Logout protects the workspace', steps: "await page.getByRole('button', { name: 'Log out' }).click();\n  await expect(page.locator('#bank-login-panel')).toBeVisible();\n  await expect(page.locator('#bank-workspace')).toBeHidden();" },
  'password-login': { name: 'Updated password works after sign out', steps: "await page.getByRole('button', { name: 'Profile' }).click();\n  await page.locator('#bank-current-password').fill('DemoPass123!');\n  await page.locator('#bank-new-password').fill('UpdatedDemo123!');\n  await page.locator('#bank-confirm-password').fill('UpdatedDemo123!');\n  await page.getByTestId('save-profile').click();\n  await page.getByRole('button', { name: 'Log out' }).click();\n  await signIn(page, 'casey@itswatts.demo', 'UpdatedDemo123!');\n  await expect(page.getByText('Quick actions')).toBeVisible();" },
  'dashboard-summary': { name: 'Dashboard shows account totals', steps: "await page.getByRole('button', { name: 'Dashboard' }).click();\n  await expect(page.getByText('TOTAL NET WORTH')).toBeVisible();\n  await expect(page.locator('#bank-net-worth')).toContainText('$');" },
  'account-balances': { name: 'Account balances update after a posted transfer', steps: "await page.getByRole('button', { name: 'Transfer' }).click();\n  await page.locator('#bank-amount').fill('25');\n  await page.getByTestId('bank-transfer').click();\n  await page.getByTestId('confirm-transfer').click();\n  await expect(page.locator('#bank-transactions')).toContainText('Checking → Savings');" },
  'activity-filter': { name: 'Activity filter shows matching status', steps: "await page.getByRole('button', { name: 'Transactions' }).click();\n  await page.locator('#bank-activity-filter').selectOption('pending');\n  await expect(page.locator('#bank-transactions')).toContainText('Pending');" },
  'transfer-review': { name: 'Transfer review matches submitted data', steps: "await page.getByRole('button', { name: 'Transfer' }).click();\n  await page.locator('#bank-amount').fill('40');\n  await page.getByTestId('bank-transfer').click();\n  await expect(page.locator('#bank-transfer-review')).toContainText('$40.00');" },
  'transfer-boundaries': { name: 'Invalid transfers are blocked', steps: "await page.getByRole('button', { name: 'Transfer' }).click();\n  await page.locator('#bank-amount').fill('0');\n  await page.getByTestId('bank-transfer').click();\n  await expect(page.locator('#bank-transfer [role=status]')).toContainText('greater than');" },
  'send-money': { name: 'Send Money updates balance and activity', steps: "await page.getByRole('button', { name: 'Send money' }).click();\n  await page.locator('#bank-recipient').fill('Taylor Reed');\n  await page.locator('#bank-send-amount').fill('18');\n  await page.getByTestId('send-money').click();\n  await expect(page.locator('#bank-send-money [role=status]')).toContainText('sent');" },
  'bill-payment': { name: 'Bill Pay creates pending activity', steps: "await page.getByRole('button', { name: 'Bill pay' }).click();\n  await page.locator('#bank-payment-date').fill('2026-12-15');\n  await page.locator('#bank-payment-amount').fill('62.44');\n  await page.getByTestId('schedule-payment').click();\n  await expect(page.locator('#bank-bill-list')).toContainText('Scheduled');" },
  'frozen-card': { name: 'Frozen card blocks payment', steps: "await page.getByRole('button', { name: 'Notifications' }).click();\n  await page.getByTestId('toggle-card').click();\n  await page.getByRole('button', { name: 'Bill pay' }).click();\n  // Complete the bill form and verify the frozen-card message." },
  alerts: { name: 'Alert preference updates state', steps: "await page.getByRole('button', { name: 'Notifications' }).click();\n  await page.locator('#bank-alert-toggle').uncheck();\n  await expect(page.locator('#bank-card-message')).toContainText('turned off');" },
  'profile-update': { name: 'Profile saves valid information', steps: "await page.getByRole('button', { name: 'Profile' }).click();\n  await page.locator('#bank-profile-phone').fill('555-0199');\n  await page.getByTestId('save-profile').click();\n  await expect(page.locator('#bank-profile [role=status]')).toContainText('Profile saved');" },
  'password-validation': { name: 'Password validation protects account', steps: "await page.getByRole('button', { name: 'Profile' }).click();\n  await page.locator('#bank-current-password').fill('DemoPass123!');\n  await page.locator('#bank-new-password').fill('not-a-match');\n  await page.locator('#bank-confirm-password').fill('different');\n  await page.getByTestId('save-profile').click();\n  await expect(page.locator('#bank-profile [role=status]')).toContainText('must match');" },
  'loan-validation': { name: 'Loan application validates required input', steps: "await page.getByRole('button', { name: 'Apply for loan' }).click();\n  await page.locator('#bank-loan-amount').fill('100');\n  await page.locator('#bank-loan-purpose').fill('Laptop');\n  await page.getByTestId('apply-loan').click();\n  await expect(page.locator('#bank-loan [role=status]')).toContainText('at least $500');" },
  'reset-state': { name: 'Reset restores initial state', steps: "await page.getByRole('button', { name: 'Transfer' }).click();\n  await page.locator('#bank-amount').fill('25');\n  await page.getByTestId('bank-transfer').click();\n  await page.getByTestId('confirm-transfer').click();\n  await page.getByRole('button', { name: 'Reset demo' }).click();\n  await expect(page.getByRole('heading', { name: 'Test systems that feel familiar.' })).toBeVisible();" },
}

function updateBankTestSelection() {
  const checkboxes = [...document.querySelectorAll('#bank-test-selection input[type="checkbox"]')]
  const selected = checkboxes.filter((input) => input.checked)
  const selectAll = byId('bank-select-all-tests')
  selectAll.checked = selected.length === checkboxes.length
  selectAll.indeterminate = selected.length > 0 && selected.length < checkboxes.length
  byId('bank-download-tests').disabled = selected.length === 0
  byId('bank-test-selection-status').textContent = selected.length ? `${selected.length} test case${selected.length === 1 ? '' : 's'} selected.` : 'Choose at least one test case.'
}

function addJointAccountTestOption() {
  const fieldset = document.querySelector('#bank-test-selection fieldset')
  if (!fieldset) return
  const label = document.createElement('label')
  label.innerHTML = '<input type="checkbox" value="joint-account" /> Joint account holders share balances and activity'
  fieldset.append(label)
}

function downloadBankTests() {
  const selected = [...document.querySelectorAll('#bank-test-selection input:checked')].map((input) => input.value)
  if (!selected.length) return
  const tests = selected.map((id) => {
    const scenario = bankTestCases[id]
    return `test(${JSON.stringify(scenario.name)}, async ({ page }) => {\n  await page.goto(baseUrl);\n  ${scenario.skipSignIn ? '' : 'await signIn(page);\n  '}${scenario.steps}\n});`
  }).join('\n\n')
  const file = `/**\n * Watt Pay Demo Bank — generated Playwright starter tests\n *\n * Quick start\n * 1. Create a folder and save this file as tests/watt-pay.spec.ts.\n * 2. In that folder, run: npm init playwright@latest\n * 3. When prompted, keep the default TypeScript option.\n * 4. Replace the generated test file with this file.\n * 5. Install browsers: npx playwright install\n * 6. Run all tests: npx playwright test\n * 7. View the HTML report: npx playwright show-report\n *\n * Optional: Run against a different deployed demo URL.\n * macOS/Linux: DEMO_BANK_URL='https://your-url/#banking-view' npx playwright test\n * Windows PowerShell: $env:DEMO_BANK_URL='https://your-url/#banking-view'; npx playwright test\n *\n * All accounts, credentials, and transactions in Watt Pay are fictional.\n */\n\nimport { test, expect } from '@playwright/test';\n\nconst baseUrl = process.env.DEMO_BANK_URL ?? 'https://demo.itswatts.com/#banking-view';\n\nasync function signIn(page, email = 'casey@itswatts.demo', password = 'DemoPass123!') {\n  await page.locator('#bank-login-email').fill(email);\n  await page.locator('#bank-login-password').fill(password);\n  await page.getByTestId('bank-sign-in').click();\n}\n\n${tests}\n`
  const url = URL.createObjectURL(new Blob([file], { type: 'text/plain' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'itswatts-demo-bank.spec.ts'
  link.click()
  URL.revokeObjectURL(url)
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
  bankUsers = cloneBankUsers()
  bankSession.signedIn = false
  bankSession.userId = null
  Object.assign(bankProfile, bankUsers[0])
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
  renderBankProfile()
  setBankExperienceVisibility()
}

function resetDemo() {
  Object.assign(state, { cart: [], promo: '', signedIn: false, search: '', category: 'all' })
  selectedEmployeeId = 'jordan-ellis'
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
  const demoUser = target.closest('[data-demo-user]')
  if (demoUser instanceof HTMLElement) {
    const user = bankUsers.find((item) => item.id === demoUser.dataset.demoUser)
    if (!user) return
    byId('bank-login-email').value = user.email
    byId('bank-login-password').value = user.password
    byId('bank-login-message').textContent = `${user.name}'s fictional credentials are ready. Select Sign in to continue.`
    return
  }
  const bankTarget = target.closest('[data-bank-target]')
  if (bankTarget instanceof HTMLElement) {
    showBankPanel(bankTarget.dataset.bankTarget)
    return
  }
  const employeeButton = target.closest('[data-select-employee]')
  if (employeeButton instanceof HTMLElement) {
    selectedEmployeeId = employeeButton.dataset.selectEmployee
    renderEmployeeProfile()
    renderEmployeeDirectory(byId('employee-search').value)
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
byId('demo-theme-toggle').addEventListener('click', () => setDemoTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'))
document.querySelectorAll('input[name="category"]').forEach((input) => input.addEventListener('change', (event) => { state.category = event.target.value; renderProducts() }))
byId('login-form').addEventListener('submit', (event) => {
  event.preventDefault()
  state.signedIn = byId('login-email').value === 'tester@itswatts.demo' && byId('login-password').value === 'DemoPass123!'
  byId('login-message').textContent = state.signedIn ? 'Signed in. The shop is now unlocked.' : 'Use the documented demo credentials.'
  setExperienceVisibility()
  if (state.signedIn) byId('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' })
})
byId('bank-show-password').addEventListener('change', (event) => { byId('bank-login-password').type = event.target.checked ? 'text' : 'password' })
byId('bank-login-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const email = byId('bank-login-email').value.trim().toLowerCase()
  const password = byId('bank-login-password').value
  const user = bankUsers.find((item) => item.email === email && item.password === password)
  if (!user) { byId('bank-login-message').textContent = 'Those fictional credentials do not match a Demo Bank profile.'; return }
  byId('bank-login-message').textContent = ''
  applyBankUser(user)
})
byId('bank-logout').addEventListener('click', () => {
  bankSession.signedIn = false
  bankSession.userId = null
  byId('bank-login-form').reset()
  byId('bank-login-message').textContent = 'You have signed out of the fictional Demo Bank.'
  setBankExperienceVisibility()
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
byId('bank-select-all-tests').addEventListener('change', (event) => {
  document.querySelectorAll('#bank-test-selection input[type="checkbox"]').forEach((input) => { input.checked = event.target.checked })
  updateBankTestSelection()
})
byId('bank-test-selection').addEventListener('change', updateBankTestSelection)
byId('bank-download-tests').addEventListener('click', downloadBankTests)
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

  if (form.dataset.systemForm === 'send-money') {
    const amount = Number(byId('bank-send-amount').value)
    const recipient = byId('bank-recipient').value.trim()
    if (!recipient) { status.textContent = 'Enter a recipient name.'; return }
    if (!Number.isFinite(amount) || amount <= 0) { status.textContent = 'Enter a payment amount greater than $0.00.'; return }
    if (advancedState.cardFrozen) { status.textContent = 'Payment blocked: the simulated debit card is frozen.'; return }
    if (advancedState.checking < amount) { status.textContent = 'Payment declined: insufficient available balance.'; return }
    advancedState.checking -= amount
    addBankTransaction('Posted', `−${money(amount)} · Payment sent to ${recipient}`)
    form.reset()
    status.textContent = `${money(amount)} sent to ${recipient} in this simulated environment.`
    renderAdvancedApps()
    return
  }

  if (form.dataset.systemForm === 'loan-application') {
    const amount = Number(byId('bank-loan-amount').value)
    const purpose = byId('bank-loan-purpose').value.trim()
    if (!Number.isFinite(amount) || amount < 500) { status.textContent = 'Enter a requested amount of at least $500.00.'; return }
    if (!purpose) { status.textContent = 'Describe the loan purpose.'; return }
    const loanType = byId('bank-loan-type').value
    form.reset()
    status.textContent = `${loanType} application for ${money(amount)} received for simulated review.`
    return
  }

  if (form.dataset.systemForm === 'bank-profile') {
    const name = byId('bank-profile-name').value.trim()
    const email = byId('bank-profile-email').value.trim()
    const phone = byId('bank-profile-phone').value.trim()
    const address = byId('bank-profile-address').value.trim()
    const address2 = byId('bank-profile-address2').value.trim()
    const city = byId('bank-profile-city').value.trim()
    const state = byId('bank-profile-state').value.trim()
    const postal = byId('bank-profile-postal').value.trim()
    const country = byId('bank-profile-country').value
    const currentPassword = byId('bank-current-password').value
    const newPassword = byId('bank-new-password').value
    const confirmPassword = byId('bank-confirm-password').value
    if (!name || !email || !phone || !address || !city || !state || !postal || !country) { status.textContent = 'Complete every required personal-information field.'; return }
    if (currentPassword || newPassword || confirmPassword) {
      if (currentPassword !== bankProfile.password) { status.textContent = 'Current password is not correct for this simulated account.'; return }
      if (newPassword.length < 8) { status.textContent = 'New password must contain at least 8 characters.'; return }
      if (newPassword !== confirmPassword) { status.textContent = 'New password and confirmation must match.'; return }
      bankProfile.password = newPassword
    }
    Object.assign(bankProfile, { name, email, phone, address, address2, city, state, postal, country })
    Object.assign(currentBankUser(), bankProfile)
    byId('bank-current-password').value = ''
    byId('bank-new-password').value = ''
    byId('bank-confirm-password').value = ''
    status.textContent = 'Profile saved. Changes apply only to this simulated banking session.'
    renderBankProfile()
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

setUpStateSelector()
setDemoTheme(document.documentElement.dataset.theme || 'dark', false)
addJointAccountTestOption()
setExperienceVisibility(); renderProducts(); renderCart(); renderAdvancedApps(); renderEmployeeProfile(); renderEmployeeDirectory()
openView(window.location.hash.slice(1), false)
