import { Fragment, useEffect, useRef } from 'react'
import { initPhilosophyMotion } from './philosophy.js'
import './Philosophy.css'

const statement = 'We build stronger institutions by building stronger people.'
const values = ['Human Centred services', 'Transparency', 'Winning Mindset', 'Ownership', 'Respect', 'Governance']

export default function Philosophy() {
  const section = useRef(null)

  useEffect(() => initPhilosophyMotion(section.current), [])

  return (
    <section className="philosophy" id="philosophy" ref={section} aria-labelledby="philosophy-heading">
      <header className="philosophy-header">
        <h2 id="philosophy-heading">Our philosophy</h2>
        <a href="#core-values">Our core values</a>
      </header>

      <div className="philosophy-composition">
        <article className="philosophy-content">
          <p className="philosophy-statement" data-philosophy-reveal>
            <svg className="philosophy-doodle philosophy-doodle-arrow" viewBox="0 0 120 72" aria-hidden="true">
              <path d="M8 58C18 14 75 5 108 36M88 34l20 2-5-19" />
            </svg>
            {statement.split(' ').map((word, index) => (
              <Fragment key={index}>
                <span className="philosophy-word-mask"><span className="philosophy-word">{word}</span></span>{' '}
              </Fragment>
            ))}
          </p>

          <div className="philosophy-text">
            <div className="philosophy-values" id="core-values">
              <h3>Our core values</h3>
              <svg className="philosophy-doodle philosophy-doodle-rays" viewBox="0 0 64 64" aria-hidden="true">
                <path d="M14 49 27 35M31 25l5-18M43 31l16-8M46 43l14 3" />
              </svg>
              <ol>{values.map((value, index) => (
                <li key={value} data-philosophy-reveal style={{ '--reveal-delay': `${index * 0.055}s` }}>{value}</li>
              ))}</ol>
              <svg className="philosophy-doodle philosophy-doodle-orbit" viewBox="0 0 110 38" aria-hidden="true">
                <path d="M8 20c17-18 88-19 94-3S22 37 10 24c-8-9 43-17 77-10" />
              </svg>
            </div>

            <div className="philosophy-purpose" data-philosophy-reveal>
              <div>
                <h3>Our vision</h3>
                <p>To be Africa’s premier resource centre for institutional transformation and professional excellence.</p>
                <svg className="philosophy-doodle philosophy-doodle-growth" viewBox="0 0 70 66" aria-hidden="true">
                  <path d="M10 56h48M18 48V34h10v14M34 48V25h10v23M50 48V14h10v34M12 26c13-1 26-9 40-20M39 7l13-1-2 12" />
                </svg>
              </div>
              <div>
                <h3>Our mission</h3>
                <p>To equip boards, secretaries, management, and staff with practical skills, tools, and frameworks that drive accountability, business performance, efficiency, and service excellence across all sectors.</p>
              </div>
            </div>
          </div>
        </article>

        <div className="philosophy-media">
          <svg className="philosophy-doodle philosophy-doodle-spark" viewBox="0 0 56 56" aria-hidden="true">
            <path d="M28 5c0 17-6 23-23 23 17 0 23 6 23 23 0-17 6-23 23-23C34 28 28 22 28 5Z" />
          </svg>
          <figure className="philosophy-photo" data-philosophy-reveal>
            <div className="philosophy-photo-window">
              <img src="/images/arzona-secretarial-training-original.jpg" alt="A professional at her desk with colleagues in the background, from the profile’s secretarial-training page." width="727" height="1024" loading="lazy" />
            </div>
            <figcaption>Building institutional capacity across Africa.</figcaption>
          </figure>
          <svg className="philosophy-doodle philosophy-doodle-loop" viewBox="0 0 160 70" aria-hidden="true">
            <path d="M8 9c28 1 83 3 99 20 21 22-22 29-23 9-1-16 38-17 65 18m-17-2 17 2-6-16" />
          </svg>
          <figure className="philosophy-photo philosophy-photo-secondary" data-philosophy-reveal>
            <div className="philosophy-photo-window">
              <img src="/images/arzona-training-audience-original.jpg" alt="Participants listening during a professional training session, from the Arzona company profile." width="2311" height="947" loading="lazy" />
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
