import { useEffect, useRef } from 'react'
import { initHeroMotion } from './hero.js'
import heroImage from '../../assets/hero_image2.avif'
import './hero.css'

function TickerWord({ word, amber = false }) {
  return (
    <span className={`signboard-ticker${amber ? ' is-amber' : ''}`} aria-hidden="true">
      <span className="ticker-measure">{word}</span>
      <span className="ticker-face ticker-face-current">{word}</span>
      <span className="ticker-face ticker-face-next">{word}</span>
    </span>
  )
}

export default function Hero() {
  const hero = useRef(null)

  useEffect(() => initHeroMotion(hero.current), [])

  return (
    <section id="home" className="hero" ref={hero} aria-labelledby="hero-title">
      <div className="hero-scene">
        <img className="hero-image" src={heroImage} alt="" fetchPriority="high" width="1600" height="1205" />
        <div className="hero-signboard">
          <svg className="signboard-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <path d="M19 5 5 19M5 5v14h14" />
          </svg>
          <h1 id="hero-title" aria-label="Welcome to Arzona Africa Resource Center">
            <span className="hero-welcome">Welcome to</span>
            Arzona <TickerWord word="Africa" /><br /><TickerWord word="Resource" amber /> Center
          </h1>
          <img className="signboard-logo" src="/images/arzona-logo.png" alt="Arzona Africa Resource Centre" width="420" height="260" />
          <span className="signboard-location">Nairobi,Kenya.</span>
        </div>
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-message">
        <p>Stronger institutions begin with stronger people.{' '}<br className="hero-message-break" />
          Professional training and consultancy that build{' '}<br className="hero-message-break" />
          leadership, governance, and professional excellence.
        </p>
      </div>
    </section>
  )
}
