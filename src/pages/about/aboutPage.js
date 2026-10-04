/** Progressive reveals without hiding content when observers or motion are unavailable. */
export function initAboutPageMotion(page) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (preference.matches || !('IntersectionObserver' in window)) return () => {}
  const targets = [...page.querySelectorAll('[data-page-reveal]')]
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { threshold: .05, rootMargin: '0px 0px -20px 0px' })
  page.classList.add('about-page-motion')
  targets.forEach(target => observer.observe(target))
  const change = () => {
    if (preference.matches) page.classList.remove('about-page-motion')
  }
  preference.addEventListener('change', change)
  return () => {
    observer.disconnect()
    preference.removeEventListener('change', change)
    page.classList.remove('about-page-motion')
    targets.forEach(target => target.classList.remove('is-visible'))
  }
}
