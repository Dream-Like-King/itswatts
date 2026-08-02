import { Logo } from './Logo'
import type { LegalDocument } from './LegalDialog'

type SiteFooterProps = { onOpenLegal: (document: LegalDocument) => void }

export function SiteFooter({ onOpenLegal }: SiteFooterProps) {
  return <footer className="site-footer">
    <div className="site-footer-brand"><Logo compact /><p>© {new Date().getFullYear()} it’s Wattϟ. Built for better software.</p></div>
    <nav className="site-footer-links" aria-label="Footer navigation">
      <button type="button" onClick={() => onOpenLegal('privacy')}>Privacy</button>
      <button type="button" onClick={() => onOpenLegal('terms')}>Terms</button>
      <button type="button" onClick={() => onOpenLegal('accessibility')}>Accessibility</button>
      <button type="button" onClick={() => onOpenLegal('demo')}>Demo Lab notice</button>
      <a href="#top">Back to top ↑</a>
    </nav>
  </footer>
}
