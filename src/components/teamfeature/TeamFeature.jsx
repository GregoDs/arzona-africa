import { useEffect, useRef } from 'react'
import { initTeamFeatureMotion } from './teamFeature.js'
import './TeamFeature.css'

export default function TeamFeature() {
  const section = useRef(null)
  useEffect(() => initTeamFeatureMotion(section.current), [])

  return (
    <section ref={section} className="team-feature" aria-labelledby="team-feature-title">
      <img className="team-feature-photo" src="/images/arzona-team-training.jpeg" alt="A facilitator leading a professional team training session." width="1600" height="1066" loading="lazy" />
      <span className="team-feature-square" aria-hidden="true" />
      <div className="team-feature-content">
        <h2 id="team-feature-title">People who make a difference.<br /><span>United by expertise.</span></h2>
        <a className="team-feature-link" href="/about-us/">
          <span>About us</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M6 5h13v13" /></svg>
        </a>
      </div>
    </section>
  )
}
