import './Clients.css'

const companies = [['IBM', 'ibm'], ['Microsoft', 'microsoft-5'], ['Deloitte', 'deloitte-1'], ['Siemens', 'siemens'], ['SAP', 'sap-3'], ['Standard Chartered', 'standard-chartered']]
const reasons = [
  ['Sector-specific expertise', 'Training tailored to public service, company, SACCO and NGO requirements.'],
  ['Practical tools', 'Board calendars, minute templates and compliance checklists for everyday use.'],
  ['Experienced facilitators', 'Certified secretaries and governance specialists with over 10 years of experience.'],
  ['Hospitality expertise', 'Specialist support for customer care, front office operations and service delivery.'],
  ['Professional recognition', 'Certificates issued, with programmes aligned to CPD requirements.'],
  ['Flexible delivery', 'Nationwide training in-house, through public workshops, virtually or in hybrid formats.'],
]

export default function Clients() {
  return (
    <section className="clients" id="clients" aria-labelledby="clients-heading">
      <header className="clients-opening">
       
        <h2 id="clients-heading">Our Clients.<br /></h2>
        <div className="clients-introduction">
          <p>Stronger teams. Better institutions.</p>
          <span>We support public service, private businesses and civil society from banks and Saccos to universities, hospitals and NGOs.</span>
        </div>
      </header>
      <div className="clients-logo-carousel" role="region" aria-label="Illustrative company logos">
        <div className="clients-logo-track">
          {[0, 1].map(copy => (
            <ul className="clients-logo-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {companies.map(([name, file]) => <li key={name}><img src={`/images/clients/${file}.svg`} alt={copy === 0 ? name : ''} width="180" height="72" /></li>)}
            </ul>
          ))}
        </div>
      </div>
      <div className="clients-reasons">
        <header><span className="clients-eyebrow">Why choose us</span><h3>Expertise that works<br />in your world.</h3></header>
        <ol>{reasons.map(([title, copy], index) => <li key={title} data-page-reveal><span className="clients-reason-number">{String(index + 1).padStart(2, '0')}</span><h4>{title}</h4><p>{copy}</p></li>)}</ol>
      </div>
    </section>
  )
}
