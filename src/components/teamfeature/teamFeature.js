/** Eased image parallax through the section's entrance and exit. */
export function teamImageOffset(top, height, viewport) {
  const progress = Math.max(0, Math.min(1, (viewport - top) / (viewport + height)))
  return (progress * 2 - 1) * height * .08
}

export function initTeamFeatureMotion(section) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0
  let offset = 0
  let lastTime = 0
  const update = time => {
    frame = 0
    const bounds = section.getBoundingClientRect()
    const target = preference.matches ? 0 : teamImageOffset(bounds.top, bounds.height, window.innerHeight)
    const delta = Math.min(64, lastTime ? time - lastTime : 16.67)
    lastTime = time
    offset += (target - offset) * (1 - Math.exp(-delta / 100))
    if (Math.abs(target - offset) < .1) offset = target
    section.style.setProperty('--team-image-offset', `${offset}px`)
    if (Math.abs(target - offset) >= .1) frame = requestAnimationFrame(update)
  }
  const schedule = () => {
    if (!frame) {
      lastTime = 0
      frame = requestAnimationFrame(update)
    }
  }
  const change = () => {
    cancelAnimationFrame(frame)
    frame = 0
    offset = 0
    section.style.removeProperty('--team-image-offset')
    schedule()
  }
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  preference.addEventListener('change', change)
  const resize = new ResizeObserver(schedule)
  resize.observe(section)
  schedule()
  return () => {
    cancelAnimationFrame(frame)
    resize.disconnect()
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    preference.removeEventListener('change', change)
    section.style.removeProperty('--team-image-offset')
  }
}
