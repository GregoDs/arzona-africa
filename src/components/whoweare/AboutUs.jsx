import BrandDoodle from '../doodles/BrandDoodle.jsx'
import { Fragment, useEffect, useRef } from 'react'
import { initAboutCanvas } from './aboutCanvas.js'
import { initAboutMotion } from './aboutUs.js'
import './AboutUs.css'

const introduction = 'Arzona Africa Resource Centre is a capacity building and institutional development firm based in Kenya, serving Africa. We strengthen governance, leadership, and professional excellence through practical, tool-based training and consultancy.'

export default function AboutUs() {
  const section = useRef(null)

  useEffect(() => initAboutMotion(section.current), [])
  useEffect(() => initAboutCanvas(section.current), [])

  return (
    <section ref={section} className="about-us" id="about" aria-labelledby="about-heading">
      <div className="about-canvas-scroll">
      <div className="about-canvas-stage">
      <canvas className="about-network-canvas" aria-hidden="true" />
      <header className="about-header">
        <h2 id="about-heading">About us</h2>
        <a className="about-anchor" href="/about-us/">Who we are</a>
      </header>

      <p className="about-intro">
        {introduction.split(' ').map((word, index) => (
          <Fragment key={index}>
            <span className="about-word-mask"><span className="about-reveal-word">{word}</span></span>{' '}
          </Fragment>
        ))}
      </p>

      <span className="about-canvas-caption">People. Knowledge. Shared progress.</span>
      </div>
      </div>
      <BrandDoodle kind="arrow" className="about-home-doodle" />
      <div className="about-story" id="who-we-are">
        <div className="about-copy" data-about-reveal>
          <span className="about-eyebrow">Who we are</span>
          <h3>Stronger institutions.<br /><em>Stronger people.</em></h3>
          <div className="about-body">
            <p>We equip boards, secretaries, management, and staff with practical skills, tools, and frameworks that drive accountability, business performance, and service excellence.</p>
            <p>Our work brings together public service, the private sector, and civil society from government institutions and banks to universities, hospitals, and NGOs.</p>
          </div>
        </div>

        <figure className="about-photo about-photo-portrait" data-about-reveal>
          <div className="about-photo-window">
            <img src="/images/arzona-leadership.jpg" alt="A facilitator presenting leadership training to a group of professionals, from the Arzona company profile." loading="lazy" width="1300" height="1040" />
          </div>
          <figcaption>Practical learning & Shared progress.</figcaption>
        </figure>

        <figure className="about-photo about-photo-landscape" data-about-reveal>
          <div className="about-photo-window">
            <img src="/images/arzona-workshop.jpg" alt="A professional development workshop pictured in the Arzona company profile." loading="lazy" width="1500" height="790" />
          </div>
        </figure>
      </div>
    </section>
  )
}
