import { initTeamFeatureMotion } from '../../components/teamfeature/teamFeature.js'

export function initServicesPageMotion(page) {
  const photos = [...page.querySelectorAll('.services-page-photo')]
  const disposePhotos = photos.map(photo => initTeamFeatureMotion(photo))
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  let observer
  const targets = [...page.querySelectorAll('[data-service-reveal]')]
  if (!preference.matches && 'IntersectionObserver' in window) {
    page.classList.add('services-page-motion')
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: .05 })
    targets.forEach(target => observer.observe(target))
  }
  const change = () => {
    if (preference.matches) page.classList.remove('services-page-motion')
  }
  preference.addEventListener('change', change)
  return () => {
    disposePhotos.forEach(dispose => dispose())
    observer?.disconnect()
    preference.removeEventListener('change', change)
    page.classList.remove('services-page-motion')
    targets.forEach(target => target.classList.remove('is-visible'))
  }
}
