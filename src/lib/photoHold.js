/** Hold a photograph only after its top reaches the fixed navbar. */
export function photoHoldOffset(top, bottom, sectionBottom, navbarBottom) {
  const travel = Math.max(0, Math.min(180, sectionBottom - bottom - 32))
  return Math.max(0, Math.min(travel, navbarBottom - top))
}

export function initPhotoHold(section, selector) {
  const photos = [...section.querySelectorAll(selector)]
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0
  const update = () => {
    frame = 0
    const navbarBottom = document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 60
    const sectionBottom = section.getBoundingClientRect().bottom
    photos.forEach(photo => {
      const previous = parseFloat(photo.style.getPropertyValue('--photo-hold')) || 0
      const bounds = photo.getBoundingClientRect()
      const offset = preference.matches ? 0 : photoHoldOffset(bounds.top - previous, bounds.bottom - previous, sectionBottom, navbarBottom)
      photo.style.setProperty('--photo-hold', `${offset}px`)
    })
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  preference.addEventListener('change', schedule)
  const resize = new ResizeObserver(schedule)
  resize.observe(section)
  photos.forEach(photo => resize.observe(photo))
  update()
  return () => {
    cancelAnimationFrame(frame)
    resize.disconnect()
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    preference.removeEventListener('change', schedule)
    photos.forEach(photo => photo.style.removeProperty('--photo-hold'))
  }
}
