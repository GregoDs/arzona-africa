/** Reveal service rows once, leaving content visible when motion is reduced. */
export function initServicesMotion(section) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (preference.matches || !('IntersectionObserver' in window)) return () => {}
  const targets = [...section.querySelectorAll('[data-services-reveal]')]
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { threshold: .1, rootMargin: '0px 0px -30px 0px' })
  section.classList.add('services-motion')
  targets.forEach(target => observer.observe(target))
  const preferenceChange = () => {
    if (preference.matches) section.classList.remove('services-motion')
  }
  preference.addEventListener('change', preferenceChange)
  return () => {
    observer.disconnect()
    preference.removeEventListener('change', preferenceChange)
    section.classList.remove('services-motion')
    targets.forEach(target => target.classList.remove('is-visible'))
  }
}
