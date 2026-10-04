import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/** Eased native scrolling without removing the scrollbar or taking over touch. */
export function initSmoothScroll() {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  let instance
  const configure = () => {
    instance?.destroy()
    instance = undefined
    if (preference.matches) return
    instance = new Lenis({
      autoRaf: true,
      lerp: .1,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -80 },
      prevent: node => Boolean(node.closest('[data-lenis-prevent]') || document.querySelector('.site-menu.is-active')),
    })
  }
  const cancelInertia = () => {
    instance?.scrollTo(window.scrollY, { immediate: true, force: true })
  }
  configure()
  preference.addEventListener('change', configure)
  window.addEventListener('arzona:menu-open', cancelInertia)
  return () => {
    instance?.destroy()
    preference.removeEventListener('change', configure)
    window.removeEventListener('arzona:menu-open', cancelInertia)
  }
}
