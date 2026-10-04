/** Decorative entrances never delay navigation or lock page input. */
export function initPageIntro(element, page) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (!element.animate) return () => {}
  let animations = []
  let timeout
  let generation = 0
  const stop = () => {
    generation++
    clearTimeout(timeout)
    animations.forEach(animation => animation.cancel())
    animations = []
    element.style.visibility = 'hidden'
  }
  const play = variant => {
    stop()
    if (preference.matches || document.visibilityState === 'hidden') return
    const current = generation
    element.dataset.page = variant
    element.style.visibility = 'visible'
    const animate = (target, frames, options) => {
      const animation = target.animate(frames, { fill: 'both', ...options })
      animations.push(animation)
      return animation
    }
    const ease = 'cubic-bezier(.76, 0, .24, 1)'
    animate(element.querySelector('.page-intro-content'), [
      { opacity: 0, transform: 'translateY(18px)' },
      { opacity: 1, transform: 'translateY(0)', offset: .25 },
      { opacity: 1, transform: 'translateY(0)', offset: .65 },
      { opacity: 0, transform: 'translateY(-16px)' },
    ], { duration: 1050, easing: 'ease' })
    const panels = [...element.querySelectorAll('.page-intro-panels span')]
    panels.forEach((panel, position) => {
      const end = variant === 'about' || variant === 'services'
        ? `translateX(${position === 0 ? '-105%' : '105%'})`
        : variant === 'contact' ? 'translateY(105%)' : 'translateY(-105%)'
      animate(panel, [{ transform: 'translate(0, 0)' }, { transform: end }], {
        duration: 650,
        delay: 650,
        easing: ease,
      })
    })
    // Hide even if the browser interrupts an animation or changes tabs.
    timeout = window.setTimeout(() => { if (current === generation) stop() }, 1550)
  }
  const contact = event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const anchor = event.target.closest?.('a[href]')
    if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
    const destination = new URL(anchor.href, window.location.href)
    if (destination.origin === window.location.origin && destination.pathname === window.location.pathname && destination.hash === '#contact') play('contact')
  }
  const key = event => { if (event.key === 'Escape' || event.key === 'Tab') stop() }
  const visibility = () => { if (document.visibilityState === 'hidden') stop() }
  const restore = event => { if (event.persisted) play(window.location.hash === '#contact' ? 'contact' : page) }
  play(window.location.hash === '#contact' ? 'contact' : page)
  document.addEventListener('click', contact)
  document.addEventListener('keydown', key)
  document.addEventListener('visibilitychange', visibility)
  window.addEventListener('wheel', stop, { passive: true })
  window.addEventListener('touchstart', stop, { passive: true })
  window.addEventListener('pageshow', restore)
  preference.addEventListener('change', stop)
  return () => {
    stop()
    document.removeEventListener('click', contact)
    document.removeEventListener('keydown', key)
    document.removeEventListener('visibilitychange', visibility)
    window.removeEventListener('wheel', stop)
    window.removeEventListener('touchstart', stop)
    window.removeEventListener('pageshow', restore)
    preference.removeEventListener('change', stop)
  }
}
