import Clients from '../../components/clients/Clients.jsx'
import BrandDoodle from '../../components/doodles/BrandDoodle.jsx'
import { useEffect, useRef } from 'react'
import { initAboutPageMotion } from './aboutPage.js'
import './AboutPage.css'

const approach = [
  ['Diagnose', 'We assess your institutional, leadership, governance and business performance gaps.'],
  ['Design', 'We customise content to your Act, Charter, sector and organisational needs.'],
  ['Deliver', 'Case studies, role plays and real tools bring learning into practice.'],
  ['Drive results', 'Post-training support, evaluation and mentorship help teams put learning to work.'],
]

function ApproachIcon({ index }) {
  const paths = [
    'M15 15l6 6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
    'M4 5h16v14H4ZM8 5v14M8 10h12M13 10v9',
    'M3 5h18v12H3ZM8 22l4-5 4 5M7 12l3-3 3 2 4-4',
    'M3 20h18M5 16l5-5 4 2 6-9M15 4h5v5',
  ]
  return <svg className="about-page-step-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={paths[index]} /></svg>
}

export default function AboutPage() {
  const page = useRef(null)
  useEffect(() => initAboutPageMotion(page.current), [])
  return (
    <div className="about-page" id="about-page-top" ref={page}>
      <header className="about-page-intro">
        <h1>About us</h1>
        <BrandDoodle kind="orbit" className="about-page-intro-doodle" />
        <h2 data-page-reveal>Stronger people.<br />Stronger institutions.</h2>
        <p className="about-page-lead" data-page-reveal>Arzona Africa Resource Centre is a capacity building and institutional development firm based in Kenya, serving Africa. We strengthen governance, leadership and professional excellence through practical training and consultancy.</p>
      </header>

      <section className="about-page-strength" aria-labelledby="strength-heading">
        <article className="about-page-strength-copy" data-page-reveal>
          <span className="about-page-formula-label">Our values & strength</span>
          <h2 id="strength-heading">Building capacity.<br />Creating lasting change.</h2>
          <p>Stronger institutions begin with people. We combine sector expertise, practical tools and hands-on learning to strengthen governance, leadership and service excellence.</p>
          <p>Every programme is shaped around your organisation — and grounded in ownership, transparency and respect.</p>
        </article>
        <div className="about-page-formula" data-page-reveal>
          <h3>The Arzona formula</h3>
          <div className="about-page-formula-board" role="img" aria-label="People plus practical tools and hands-on learning lead to stronger institutions. Our approach: diagnose, design, deliver and drive results.">
            <svg viewBox="0 0 600 540" aria-hidden="true" focusable="false">
              <g className="formula-ink">
                <path d="M45 100 Q100 32 182 76 M158 54 L184 76 L156 90" />
                <path d="M66 182 Q122 172 196 181 M72 189 Q142 183 188 190" />
                <path d="M282 157 L282 187 M268 172 L298 172" />
                <path d="M395 104 Q491 75 545 136 Q581 202 516 241 Q422 271 371 207 Q341 143 395 104Z" />
                <path d="M103 261 Q148 287 138 329 Q121 349 101 326 Q90 302 124 294 Q180 287 233 333 M211 315 L234 334 L211 342" />
                <path d="M446 281 Q504 293 482 359 M470 343 L482 362 L498 342" />
                <path d="M287 361 L314 359 M289 374 L314 373" />
                <path d="M179 477 Q337 464 529 478 M200 486 Q371 477 510 487" />
                <path d="M44 413 L44 465 L113 465 M58 449 L77 429 L91 436 L113 406 M101 408 L115 404 L112 419" />
                <path d="M546 47 L546 69 M535 58 L557 58" />
              </g>
              <g className="formula-handwriting" fill="currentColor">
                <text x="65" y="159" transform="rotate(-5 65 159)">people first</text>
                <text x="389" y="161" transform="rotate(5 389 161)">practical</text>
                <text x="418" y="205" transform="rotate(5 418 205)">tools</text>
                <text x="250" y="298" transform="rotate(-4 250 298)">learn by doing</text>
                <text x="184" y="426">stronger people,</text>
                <text x="178" y="469">stronger institutions</text>
              </g>
            </svg>
          </div>
          <p className="about-page-formula-note">Diagnose <span>→</span> Design <span>→</span> Deliver <span>→</span> Drive results</p>
        </div>
      </section>

      <Clients />

      <section className="about-page-learning about-page-section" aria-labelledby="learning-heading">
        <div className="about-page-learning-heading" data-page-reveal>
          <span className="about-page-formula-label">Learning in practice</span>
          <h2 id="learning-heading">Ideas become action.</h2>
          <BrandDoodle kind="arrow" />
        </div>
        <div className="about-page-learning-photos">
          <figure className="about-page-photo" data-page-reveal><img src="/images/arzona-insight-leadership.jpeg" alt="Professionals taking notes during a workshop." width="1600" height="1068" loading="lazy" /><figcaption>Space to learn.</figcaption></figure>
          <BrandDoodle kind="spark" />
          <figure className="about-page-photo" data-page-reveal><img src="/images/arzona-insight-digital.jpeg" alt="A participant listening closely to a workshop presenter." width="1600" height="900" loading="lazy" /><figcaption>Confidence to apply it.</figcaption></figure>
        </div>
      </section>

      <section className="about-page-approach about-page-section" aria-labelledby="approach-heading">
        <h2 className="about-page-label" id="approach-heading">The Arzona 4D approach</h2>
        <div className="about-page-approach-intro" data-page-reveal><p>Built around you.<br />Designed for progress.</p><BrandDoodle kind="growth" /></div>
        <div className="about-page-steps">{approach.map(([title, description], index) => (
          <details key={title} data-page-reveal open={index === 0}>
            <summary><span className="about-page-step">{String(index + 1).padStart(2, '0')}</span><ApproachIcon index={index} /><span>{title}</span><span className="about-page-step-toggle" aria-hidden="true">+</span></summary>
            <p>{description}</p>
          </details>
        ))}</div>
        <div className="about-page-invitation" data-page-reveal><div><BrandDoodle kind="orbit" /><p>Let’s build what’s next.</p></div><a href="mailto:info@arzonaafrica.org">Discuss your training needs <span aria-hidden="true">↗</span></a></div>
      </section>
    </div>
  )
}
