import { useEffect, useRef, useState } from 'react'
import { initServicesPageMotion } from './servicesPage.js'
import BrandDoodle from '../../components/doodles/BrandDoodle.jsx'
import ServiceIcon from '../../components/services/ServiceIcon.jsx'
import './ServicesPage.css'

const services = [
  ['governance', 'Governance & board support', 'governance', ['Secretary certification & board effectiveness', 'Compliance, minute writing & records', 'Governance audits & risk oversight']],
  ['customer-service', 'Customer service & front office', 'service', ['Client care & front office excellence', 'Communication & complaint handling', 'Records & client relationships']],
  ['business', 'Business & commercial excellence', 'business', ['Business acumen & financial performance', 'Pricing, sales & market intelligence', 'Business development & innovation']],
  ['leadership', 'Leadership & management', 'leadership', ['Executive & team leadership', 'Change management & policy', 'Accountability & resilience']],
  ['professional-skills', 'Institutional & professional skills', 'skills', ['HR, procurement & contracts', 'Monitoring, evaluation & learning', 'Finance, audit & resource mobilisation']],
  ['digital', 'Digital transformation', 'digital', ['E-governance & digital records', 'Data analytics & reporting', 'Cyber security awareness']],
]
const delivery = [['house', 'In-house'], ['workshop', 'Workshops'], ['virtual', 'Virtual'], ['retreat', 'Retreats'], ['mentor', 'Mentorship']]
const servicePhotos = {
  governance: ['/images/arzona-insight-governance.jpeg', 'A trainer presenting at a flip chart.'],
  business: ['/images/arzona-team-training.jpeg', 'A facilitator in discussion with a group of professionals.'],
  'professional-skills': ['/images/arzona-insight-leadership.jpeg', 'Professionals taking notes during training.'],
}

const outcomes = [
  ['Statutory confidence', 'Understand statutory duties and compliance requirements.'],
  ['Effective board processes', 'Master board processes, record keeping and decision tracking.'],
  ['Ethical judgement', 'Handle conflicts of interest and ethical dilemmas.'],
  ['Digital capability', 'Digitise records and implement e-governance.'],
  ['Strategic support', 'Provide strategic support to boards and accounting officers.'],
]
const approach = [
  ['Diagnose', 'Find the gaps.'],
  ['Design', 'Shape training around your needs.'],
  ['Deliver', 'Practise with real tools.'],
  ['Drive results', 'Follow through with support and mentorship.'],
]

export default function ServicesPage() {
  const page = useRef(null)
  const [outcome, setOutcome] = useState(0)
  useEffect(() => initServicesPageMotion(page.current), [])

  return (
    <div className="services-page" id="services-page-top" ref={page}>
      <header className="services-page-intro services-page-container">
        <span className="services-page-label">Our services</span>
        <div className="services-page-intro-layout">
          <h1 data-service-reveal>Practical skills.<br /><em>Stronger institutions.</em></h1>
          <BrandDoodle kind="growth" className="services-intro-doodle" />
        </div>
      </header>

      <section className="services-page-offerings services-page-container" aria-label="Our service areas">
        {services.map(([id, title, icon, topics], index) => (
          <article className="services-page-row" id={id} key={id} data-service-reveal>
            <div className="services-page-service-heading">
              <div className="services-page-service-meta"><span>{String(index + 1).padStart(2, '0')}</span><ServiceIcon name={icon} /></div>
              <h2>{title}</h2>
              {servicePhotos[id] && <figure className="services-page-inline-photo"><img src={servicePhotos[id][0]} alt={servicePhotos[id][1]} width="1600" height="1068" loading="lazy" /></figure>}
            </div>
            <div className="services-page-service-details">
              <ul>{topics.map(topic => <li key={topic}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg><span>{topic}</span></li>)}</ul>
              <BrandDoodle kind={index % 2 === 0 ? 'arrow' : 'orbit'} />
            </div>
          </article>
        ))}
      </section>

      <section className="services-page-photo services-page-capacity" aria-labelledby="capacity-heading">
        <img src="/images/arzona-team-training.jpeg" alt="Professionals discussing a training topic with a facilitator." width="1600" height="1066" loading="lazy" />
        <div className="services-page-photo-content"><span className="services-page-square" aria-hidden="true" /><h2 id="capacity-heading">Practical expertise.<br /><span>Lasting capacity.</span></h2></div>
      </section>

      <section className="services-page-outcomes services-page-container" aria-labelledby="outcomes-heading">
        <header><h2 id="outcomes-heading">Secretarial training.<br />Ready for the boardroom.</h2><p>Public Service · Private Sector · NGOs</p></header>
        <div className="services-page-slider" role="region" aria-roledescription="carousel" aria-label="Secretarial training outcomes">
          <div className="services-page-slide" aria-live="polite" aria-atomic="true">
            <span className="services-page-label">Learning outcome {String(outcome + 1).padStart(2, '0')} / 05</span>
            <h3>{outcomes[outcome][0]}</h3>
            <p>{outcomes[outcome][1]}</p>
          </div>
          <div className="services-page-slider-controls">
            <button type="button" aria-label="Previous learning outcome" onClick={() => setOutcome(value => (value + outcomes.length - 1) % outcomes.length)}>←</button>
            <div className="services-page-slider-dots">{outcomes.map(([title], index) => <button key={title} type="button" aria-label={`Show ${title}`} aria-pressed={outcome === index} onClick={() => setOutcome(index)} />)}</div>
            <button type="button" aria-label="Next learning outcome" onClick={() => setOutcome(value => (value + 1) % outcomes.length)}>→</button>
          </div>
        </div>
      </section>

      <section className="services-page-photo services-page-learning" aria-labelledby="learning-heading">
        <img src="/images/arzona-insight-digital.jpeg" alt="A participant taking notes while a colleague presents." width="1600" height="900" loading="lazy" />
        <div className="services-page-photo-content"><span className="services-page-square" aria-hidden="true" /><h2 id="learning-heading">Beyond the classroom.<br />Put learning to work.</h2></div>
      </section>

      <section className="services-page-approach services-page-container" aria-labelledby="services-approach-heading">
        <h2 className="services-page-label" id="services-approach-heading">The Arzona 4D approach</h2>
        <ol>{approach.map(([title, description], index) => <li data-service-reveal key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
        <div className="services-page-delivery"><ul>{delivery.map(([icon, label]) => <li key={icon}><ServiceIcon name={icon} /><span>{label}</span></li>)}</ul><a href="mailto:info@arzonaafrica.org">Discuss your training needs <span aria-hidden="true">↗</span></a></div>
      </section>
    </div>
  )
}
