import BrandDoodle from '../doodles/BrandDoodle.jsx'
import { useState } from 'react'
import './expertise.css'

const offerings = [
  ['Governance & board support', ['Certified secretary programmes', 'Corporate governance & compliance', 'Minute writing & board records', 'Board evaluations & governance audits']],
  ['Customer service & front office', ['Front office excellence', 'Client care & complaint management', 'Communication & telephone etiquette', 'Records & client relationships']],
  ['Business & commercial excellence', ['Business acumen & financial performance', 'Pricing & cost optimisation', 'Sales & business development', 'Market & customer intelligence']],
  ['Leadership & management', ['Executive & strategic leadership', 'Supervisory skills & team development', 'Change management', 'Policy, accountability & resilience']],
  ['Institutional & professional skills', ['Human resource management', 'Procurement & contract management', 'Monitoring, evaluation & learning', 'Financial management & resource mobilisation']],
  ['Digital transformation', ['E-governance & digital records', 'Data analytics & reporting', 'Institutional cyber security awareness']],
]

function ExpertiseBox({ title, topics, index }) {
  const [open, setOpen] = useState(false)
  const id = `expertise-topics-${index}`

  return (
    <article className={`expertise-box${open ? ' is-open' : ''}`}
      onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(true) }}
      onPointerLeave={event => { if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) setOpen(false) }}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}>
      <div className="expertise-box-panel" aria-hidden="true" />
      <span className="expertise-box-number">{String(index + 1).padStart(2, '0')}</span>
      <button className="expertise-box-toggle" type="button" aria-label={`${open ? 'Hide' : 'Show'} ${title} expertise`} aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)} onKeyDown={event => { if (event.key === 'Escape') setOpen(false) }}>
        <svg viewBox="0 0 36 36" aria-hidden="true"><path d="M6 30 30 6M9 6h21v21" /></svg>
      </button>
      <ul className="expertise-box-topics" id={id} aria-hidden={!open}>
        {topics.map((topic, topicIndex) => <li key={topic} style={{ '--topic-index': topicIndex }}>{topic}</li>)}
      </ul>
      <h3>{title}</h3>
    </article>
  )
}

export default function Expertise() {
  return (
    <section className="expertise" id="expertise" aria-labelledby="expertise-title">
      <div className="expertise-grid">
        <header className="expertise-heading">
          <h2 id="expertise-title">Our areas of expertise</h2>
          <BrandDoodle kind="growth" className="expertise-heading-doodle" />
        </header>
        <a className="expertise-services-label" href="/services/">Our services</a>
        {offerings.map(([title, topics], index) => <ExpertiseBox key={title} title={title} topics={topics} index={index} />)}
      </div>
    </section>
  )
}
