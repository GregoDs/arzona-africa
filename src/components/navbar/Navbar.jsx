import { useEffect, useRef, useState } from 'react'
import { initMenu } from './navbar.js'
import { navigation } from '../../lib/navigation.js'
import './Navbar.css'

function AnimatedText({ text }) {
  return (
    <span className="nav-animated-text" aria-hidden="true">
      {[...text].map((character, index) => (
        <span key={index} style={{ transitionDelay: `${index * 0.01}s` }}>
          {character === ' ' ? '\u00a0' : character}
        </span>
      ))}
    </span>
  )
}

export default function Navbar({ light = false }) {
  const menu = useRef(null)
  const trigger = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => menuOpen ? initMenu(menu.current, trigger.current, () => setMenuOpen(false)) : undefined, [menuOpen])

  return (
    <>
        <header className={`site-header${light ? ' is-light-page' : ''}${menuOpen ? ' is-menu-open' : ''}`}>
          <a className="brand" href="/#home" aria-label="Arzona Africa home" onClick={() => setMenuOpen(false)}>
            <img className="brand-logo" src="/images/arzona-logo.png" alt="Arzona Africa Resource Centre" width="420" height="260" />
          </a>
          <button
            ref={trigger}
            className="menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="menu-toggle-background" aria-hidden="true" />
            <AnimatedText text={menuOpen ? 'Close' : 'Menu'} />
            <span className={menuOpen ? 'menu-icon is-open' : 'menu-icon'} aria-hidden="true">
              <i /><i /><i />
            </span>
          </button>
        </header>

      <div className={`menu-backdrop${menuOpen ? ' is-active' : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      <div
        ref={menu}
        id="site-menu"
        data-lenis-prevent
        className={`site-menu${menuOpen ? ' is-active' : ''}`}
        role="dialog"
        aria-modal={menuOpen ? true : undefined}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        aria-label="Navigation"
      >
        <a className="menu-brand" href="/#home" aria-label="Arzona Africa home" onClick={() => setMenuOpen(false)}>
          <img src="/images/arzona-logo.png" alt="Arzona Africa Resource Centre" width="420" height="260" />
        </a>
        <nav aria-label="Main navigation">
          <ul className="menu-list">
            {navigation.map(([label, href], index) => (
              <li className="menu-item" key={href} style={{ '--item-index': index }}>
                <a className="menu-link" href={href} aria-label={label} onClick={() => setMenuOpen(false)}>
                  <AnimatedText text={label} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-bottom">
          <p>Building stronger institutions by building stronger people.</p>
          <p>Nairobi, Kenya · Serving Africa</p>
        </div>
      </div>
    </>
  )
}
