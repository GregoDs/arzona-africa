/** Hero motion is scoped to its element and cleans up for React Strict Mode. */
export function initHeroMotion(element) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0
  const update = () => {
    frame = 0
    const offset = Math.min(window.scrollY, element.offsetHeight)
    element.style.setProperty('--image-offset', `${offset * 0.18}px`)
  }
  const scroll = () => {
    if (!reducedMotion.matches && !frame) frame = requestAnimationFrame(update)
  }
  const preference = () => {
    element.style.setProperty('--image-offset', '0px')
    scroll()
  }
  window.addEventListener('scroll', scroll, { passive: true })
  reducedMotion.addEventListener('change', preference)
  return () => {
    window.removeEventListener('scroll', scroll)
    reducedMotion.removeEventListener('change', preference)
    cancelAnimationFrame(frame)
    element.style.removeProperty('--image-offset')
  }
}
