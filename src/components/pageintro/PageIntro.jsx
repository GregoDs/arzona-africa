import { useEffect, useRef } from 'react'
import { initPageIntro } from './pageIntro.js'
import './PageIntro.css'

export default function PageIntro({ page }) {
  const intro = useRef(null)
  useEffect(() => initPageIntro(intro.current, page), [page])

  return (
    <div className="page-intro" ref={intro} aria-hidden="true" inert>
      <div className="page-intro-panels"><span /><span /><span /></div>
      <div className="page-intro-content">
        <img src="/images/arzona-logo.png" alt="" width="420" height="260" />
      </div>
    </div>
  )
}
