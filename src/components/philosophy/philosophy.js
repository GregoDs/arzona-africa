import { initPhotoHold } from '../../lib/photoHold.js'

/** Line reveals, a rising image mask, and navbar-triggered photograph holds. */
export function initPhilosophyMotion(section) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (preference.matches || !('IntersectionObserver' in window)) return () => {}
  const targets = [...section.querySelectorAll('[data-philosophy-reveal]')]
  const words = [...section.querySelectorAll('.philosophy-word')]
  const photos = [...section.querySelectorAll('.philosophy-photo')]
  const disposePhotoHold = initPhotoHold(section, '.philosophy-photo')
  let frame = 0
  let disposed = false
  const measureLines = () => {
    const lines = new Map()
    words.forEach(word => {
      const top = word.parentElement.offsetTop
      if (!lines.has(top)) lines.set(top, lines.size)
      word.style.setProperty('--reveal-delay', `${lines.get(top) * .1}s`)
    })
  }
  measureLines()
  section.classList.add('philosophy-motion')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { threshold: .12, rootMargin: '0px 0px -35px 0px' })
  targets.forEach(target => observer.observe(target))
  const resize = new ResizeObserver(measureLines)
  resize.observe(section)
  document.fonts?.ready.then(() => { if (!disposed) measureLines() })
  const update = () => {
    frame = 0
    if (preference.matches) return
    photos.forEach(photo => {
      const bounds = photo.getBoundingClientRect()
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return
      // Measure the unclipped figure, never the masked image inside it.
      if (bounds.bottom > 0 && bounds.top < window.innerHeight - 35) {
        photo.classList.add('is-visible')
        observer.unobserve(photo)
      }

    })
  }
  const scroll = () => { if (!frame) frame = requestAnimationFrame(update) }
  const preferenceChange = () => {
    if (preference.matches) {
      section.classList.remove('philosophy-motion')
    }
  }
  window.addEventListener('scroll', scroll, { passive: true })
  window.addEventListener('resize', scroll)
  preference.addEventListener('change', preferenceChange)
  update()
  return () => {
    disposed = true
    disposePhotoHold()
    observer.disconnect()
    resize.disconnect()
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', scroll)
    window.removeEventListener('resize', scroll)
    preference.removeEventListener('change', preferenceChange)
    section.classList.remove('philosophy-motion')
    targets.forEach(target => target.classList.remove('is-visible'))
    words.forEach(word => word.style.removeProperty('--reveal-delay'))
  }
}
