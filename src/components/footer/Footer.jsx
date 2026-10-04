import BrandDoodle from '../doodles/BrandDoodle.jsx'
import { navigation } from '../../lib/navigation.js'
import './Footer.css'

export default function Footer({ topHref = '#home' }) {
  return (
    <footer className="site-footer" id="contact" aria-labelledby="footer-heading">
      <div className="footer-panel">
        <div className="footer-opening">
          <a className="footer-brand" href="/#home" aria-label="Arzona Africa home">
            <img src="/images/arzona-logo.png" alt="Arzona Africa Resource Centre" width="420" height="260" />
          </a>
          <nav aria-label="Footer navigation">
            <ul>{navigation.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
          </nav>
          <div className="footer-contact-column">
            <address>
              <p>Nairobi, Kenya<br />Serving Africa</p>
              <a href="mailto:info@arzonaafrica.org">info@arzonaafrica.org</a>
            </address>
            <span className="footer-square" aria-hidden="true" />
          </div>
        </div>
        <BrandDoodle kind="arrow" className="footer-doodle" />
        <div className="footer-middle">
          <h2 id="footer-heading">Arzona Africa</h2>
          <p>Resource Centre</p>
        </div>
        <div className="footer-bottom">
          <p>Building institutional capacity across Africa.</p>
          <a href="mailto:info@arzonaafrica.org">Let’s work together <span aria-hidden="true">↗</span></a>
          <div className="footer-legal"><a href={topHref}>Back to top ↑</a><span>© {new Date().getFullYear()} Arzona Africa</span></div>
        </div>
      </div>
    </footer>
  )
}
