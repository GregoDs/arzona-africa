import BrandDoodle from '../doodles/BrandDoodle.jsx'
import './Insights.css'

const insights = [
  {
    category: 'Governance',
    title: 'Better board decisions begin with better records',
    image: 'governance',
    alt: 'A facilitator explaining a topic at a flip chart.',
    introduction: 'Clear minutes and decision tracking help boards turn discussion into action.',
    notes: 'Record the decision, the person responsible and the agreed timeline. Keep an action register alongside your minutes and review outstanding items at the next meeting.',
  },
  {
    category: 'Leadership',
    title: 'Make learning part of the way your team works',
    image: 'leadership',
    alt: 'Professionals taking notes during a training session.',
    introduction: 'Practical training makes its greatest difference when teams apply it together.',
    notes: 'Choose one workplace challenge before a training session. Afterwards, agree on one change to try, give someone ownership and set a time to review what the team learned.',
  },
  {
    category: 'Digital transformation',
    title: 'A practical starting point for digital records',
    image: 'digital',
    alt: 'A participant taking notes while a colleague presents.',
    introduction: 'Start with a clear record-keeping process before choosing your digital tools.',
    notes: 'Identify the records your team creates, who needs access and where they are stored. Agree on naming conventions, permissions and a backup process before moving more records online.',
  },
]

export default function Insights() {
  return (
    <section className="insights" id="insights" aria-labelledby="insights-heading">
      <div className="insights-heading"><h2 id="insights-heading">Latest Insights</h2><BrandDoodle kind="spark" /></div>
      <div className="insights-grid">
        {insights.map(insight => (
          <article className="insight" key={insight.image}>
            <div className="insight-photo"><img src={`/images/arzona-insight-${insight.image}.jpeg`} alt={insight.alt} loading="lazy" width="1600" height={insight.image === 'digital' ? '900' : '1068'} /></div>
            <span className="insight-category">{insight.category}</span>
            <h3>{insight.title}</h3>
            <p>{insight.introduction}</p>
            <details>
              <summary>Read insight <span aria-hidden="true">↗</span></summary>
              <p>{insight.notes}</p>
            </details>
          </article>
        ))}
      </div>
    </section>
  )
}
