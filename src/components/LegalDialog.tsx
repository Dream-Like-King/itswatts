import type { ReactNode } from 'react'

export type LegalDocument = 'privacy' | 'terms' | 'accessibility' | 'demo'

type LegalDialogProps = {
  document: LegalDocument | null
  onClose: () => void
}

const legalContent: Record<LegalDocument, { label: string; title: string; body: ReactNode }> = {
  privacy: {
    label: 'PRIVACY',
    title: 'Privacy notice',
    body: <>
      <p><strong>Last updated: August 1, 2026.</strong> It’s Watts is an educational QA website. We collect only the information needed to operate the site and improve its learning resources.</p>
      <h3>What may be collected</h3>
      <ul><li>Questions and recent chat context you send to Ask Watt.</li><li>A random browser safety identifier used to apply the Ask Watt question limit.</li><li>Basic usage information through Google Analytics, such as page views, device/browser information, and referral information.</li><li>Information you choose to send to <a href="mailto:contact@itswatts.com">contact@itswatts.com</a>.</li></ul>
      <h3>How it is used</h3>
      <p>We use this information to provide Ask Watt, protect it from abuse, understand which resources are useful, and respond to messages. Ask Watt conversations are sent to OpenAI to generate a response. Google Analytics is provided by Google.</p>
      <h3>Your choices</h3>
      <p>You can avoid using Ask Watt, avoid sending personal or sensitive information in chat, and use your browser settings or extensions to limit analytics. For a privacy question or request, contact us at <a href="mailto:contact@itswatts.com">contact@itswatts.com</a>.</p>
      <p className="legal-note">This notice is a plain-language summary and should be reviewed with a qualified privacy professional as the site grows.</p>
    </>,
  },
  terms: {
    label: 'TERMS',
    title: 'Terms of use',
    body: <>
      <p><strong>Last updated: August 1, 2026.</strong> It’s Watts provides educational QA resources, practice activities, and fictional demonstrations for learning purposes.</p>
      <h3>Use the site responsibly</h3>
      <p>You may use the content for personal learning and professional development. Do not misuse the site, interfere with its services, attempt to bypass usage limits, or submit harmful content through Ask Watt.</p>
      <h3>Educational—not professional advice</h3>
      <p>Content from It’s Watts and Ask Watt is general education. It is not legal, financial, security, employment, accessibility compliance, or other professional advice. Apply your own judgment and your organization’s policies.</p>
      <h3>External services</h3>
      <p>Links to third-party sites are provided for convenience. Their content and privacy practices are their own.</p>
      <p className="legal-note">These starter terms should be reviewed by a qualified legal professional before relying on them as formal legal terms.</p>
    </>,
  },
  accessibility: {
    label: 'ACCESSIBILITY',
    title: 'Accessibility statement',
    body: <>
      <p>It’s Watts aims to make its QA education and practice resources usable by as many people as possible. We work toward clear structure, keyboard-friendly interactions, readable color contrast, responsive layouts, and reduced friction across devices.</p>
      <h3>Feedback is welcome</h3>
      <p>If something is difficult to use, hard to read, or unavailable with your assistive technology, please tell us what happened and which page or device you were using.</p>
      <p><a className="legal-contact" href="mailto:contact@itswatts.com?subject=Accessibility%20feedback%20for%20It%27s%20Watts">Send accessibility feedback →</a></p>
      <p className="legal-note">Accessibility is ongoing work. We appreciate feedback that helps us improve.</p>
    </>,
  },
  demo: {
    label: 'DEMO LAB',
    title: 'Demo Lab notice',
    body: <>
      <p>The It’s Watts Demo Lab is a fictional QA practice environment. Its shopping, claims, HR, and banking experiences are designed for learning, exploratory testing, and automation practice.</p>
      <h3>No real services or records</h3>
      <p>Do not enter real passwords, financial information, personal data, or confidential information. The demo environments do not provide real banking, employment, insurance, or purchasing services. Displayed people, accounts, balances, and records are fictional.</p>
      <p>Practice data and UI behavior may change or reset without notice as the lab evolves.</p>
    </>,
  },
}

export function LegalDialog({ document, onClose }: LegalDialogProps) {
  if (!document) return null
  const content = legalContent[document]
  return <div className="legal-overlay" role="presentation" onMouseDown={onClose}>
    <section className="legal-dialog" role="dialog" aria-modal="true" aria-labelledby="legal-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
      <div className="legal-dialog-head"><div><p className="eyebrow">{content.label}</p><h2 id="legal-dialog-title">{content.title}</h2></div><button type="button" className="legal-close" onClick={onClose} aria-label="Close legal notice">×</button></div>
      <div className="legal-dialog-content">{content.body}</div>
    </section>
  </div>
}
