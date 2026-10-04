/** Scroll-driven word emphasis, with copy and photographs revealed on entry. */
export function initAboutMotion(section) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (preference.matches || !('IntersectionObserver' in window)) return () => {}

  const targets = [...section.querySelectorAll('[data-about-reveal]')]
  const words = [...section.querySelectorAll('.about-reveal-word')]
  const track = section.querySelector('.about-canvas-scroll')
  const stage = section.querySelector('.about-canvas-stage')
  let frame = 0
  const updateWords = () => {
    frame = 0
    if (preference.matches) {
      words.forEach(word => word.style.removeProperty('--word-opacity'))
      return
    }
    const distance = Math.max(1, track.offsetHeight - stage.offsetHeight)
    const progress = Math.max(0, Math.min(1, -track.getBoundingClientRect().top / distance))
    words.forEach((word, index) => {
      const reveal = Math.max(0, Math.min(1, progress * (words.length + 3) - index))
      word.style.setProperty('--word-opacity', String(.4 + reveal * .6))
    })
  }
  const scroll = () => {
    if (!frame) frame = requestAnimationFrame(updateWords)
  }
  updateWords()
  window.addEventListener('scroll', scroll, { passive: true })
  window.addEventListener('resize', scroll)
  section.classList.add('about-motion')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' })
  targets.forEach(target => observer.observe(target))
  const revealAll = () => {
    section.classList.toggle('about-motion', !preference.matches)
    scroll()
  }
  preference.addEventListener('change', revealAll)

  return () => {
    observer.disconnect()
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', scroll)
    window.removeEventListener('resize', scroll)
    preference.removeEventListener('change', revealAll)
    section.classList.remove('about-motion')
    targets.forEach(target => target.classList.remove('is-visible'))
    words.forEach(word => word.style.removeProperty('--word-opacity'))
  }
}
