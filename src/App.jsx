import { useEffect } from 'react'
import { initSmoothScroll } from './lib/smoothScroll.js'
import PageIntro from './components/pageintro/PageIntro.jsx'
import AboutPage from './pages/about/AboutPage.jsx'
import ServicesPage from './pages/services/ServicesPage.jsx'
import Navbar from './components/navbar/Navbar.jsx'
import Hero from './components/hero/Hero.jsx'
import AboutUs from './components/whoweare/AboutUs.jsx'
import Expertise from './components/expertise/Expertise.jsx'
import Insights from './components/insights/Insights.jsx'
import TeamFeature from './components/teamfeature/TeamFeature.jsx'
import Footer from './components/footer/Footer.jsx'

export default function App() {
  const isAboutPage = /^\/about-us\/?$/.test(window.location.pathname)
  const isServicesPage = /^\/services\/?$/.test(window.location.pathname)
  useEffect(() => initSmoothScroll(), [])
  useEffect(() => {
    document.title = isAboutPage ? 'About us | Arzona Africa Resource Centre' : isServicesPage ? 'Services | Arzona Africa Resource Centre' : 'Arzona Africa Resource Centre'
  }, [isAboutPage, isServicesPage])

  return (
    <>
      <PageIntro page={isAboutPage ? 'about' : isServicesPage ? 'services' : 'home'} />
      <Navbar light={isAboutPage} />
      <main id="page-content">
        {isAboutPage ? <AboutPage /> : isServicesPage ? <ServicesPage /> : (
          <>
            <Hero />
            <AboutUs />
            <Expertise />
            <TeamFeature />
            <Insights />
          </>
        )}
      </main>
      <Footer topHref={isAboutPage ? '#about-page-top' : isServicesPage ? '#services-page-top' : '#home'} />
    </>
  )
}
