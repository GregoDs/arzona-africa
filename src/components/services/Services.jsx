import { useEffect, useRef } from 'react'
import { initServicesMotion } from './services.js'
import ServiceIcon from './ServiceIcon.jsx'
import './Services.css'

const services = [
  ['Governance & board support', 'Secretarial training, statutory compliance, board effectiveness and governance audits.'],
  ['Customer service & front office', 'Practical skills for client care, communication and service excellence.'],
  ['Business acumen & commercial excellence', 'Financial performance, pricing, sales strategy and business development.'],
  ['Leadership & management', 'Strategic leadership, team development, change management and accountability.'],
  ['Institutional & professional skills', 'HR, procurement, monitoring and evaluation, resource mobilisation and financial management.'],
  ['Digital transformation & e-governance', 'Digital records, data analytics and institutional cyber security awareness.'],
]

const serviceIcons = ['governance', 'service', 'business', 'leadership', 'skills', 'digital']


export default function Services() {
  const section = useRef(null)
  useEffect(() => initServicesMotion(section.current), [])

  return (
    <section className="services" id="services" ref={section} aria-labelledby="services-heading">
      <header className="services-header">
        <h2 id="services-heading">Our services</h2>
        <span>Training & consultancy</span>
      </header>
      <div className="services-opening">
        <svg className="services-doodle services-doodle-graph" viewBox="0 0 120 100" aria-hidden="true">
          <path d="M14 12v72h94M28 71V54h13v17m12 0V39h13v32m12 0V23h13v48M25 39c23-3 44-17 72-27m-17 0 17 0-4 16" />
        </svg>
      <p className="services-intro" data-services-reveal>
        Practical expertise. Lasting capacity. Training and consultancy shaped around your institution’s needs.
      </p>
        <svg className="services-doodle services-doodle-curve" viewBox="0 0 110 80" aria-hidden="true">
          <path d="M12 9c54-8 88 17 62 38-18 15-35-2-20-11 17-10 33 10 34 32M76 56l12 12 10-14" />
        </svg>
      </div>
      <ol className="services-list">
        {services.map(([title, description], index) => (
          <li key={title} data-services-reveal>
            <span className="services-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <ServiceIcon name={serviceIcons[index]} className="services-category-icon" />
            <h3 aria-label={title}>
              <span className="services-flip-title" aria-hidden="true">
                {title.split(' ').map((word, wordIndex) => (
                  <span className="services-flip-word" key={wordIndex}>
                    {[...word].map((letter, letterIndex) => (
                      <span className="services-flip-letter" key={letterIndex} style={{ transitionDelay: `${(title.split(' ').slice(0, wordIndex).join(' ').length + letterIndex) * .01}s` }}>{letter}</span>
                    ))}
                    {wordIndex < title.split(' ').length - 1 ? '\u00a0' : ''}
                  </span>
                ))}
              </span>
            </h3>
            <p>{description}</p>
            <svg className="services-end-arrow" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M6 26 25 7M10 7h15v15" />
            </svg>
          </li>
        ))}
      </ol>
      <div className="services-sketches" aria-hidden="true">
        <svg className="services-sketch" viewBox="0 0 100 64"><path d="M8 52h82M17 45V30h13v15m12 0V19h13v26m12 0V8h13v37M9 19c18 1 34-8 48-15m-12 0 12 0-3 11" /></svg>
        <svg className="services-sketch" viewBox="0 0 120 64"><path d="M8 32c12-25 44-28 60-8 15 19-18 32-24 13-5-17 40-17 65 8m-18-1 18 1-5-16" /></svg>
        <svg className="services-sketch" viewBox="0 0 90 64"><path d="M12 40 28 24l14 10L68 9m-15 1 15-1-1 15M16 51l50-2M75 37v15m-7-8h15" /></svg>
      </div>
     
    </section>
  )
}
