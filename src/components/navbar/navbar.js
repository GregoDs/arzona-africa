/** Keep keyboard navigation inside the open menu, with Escape and focus return. */
export function initMenu(panel, trigger, close) {
  window.dispatchEvent(new Event('arzona:menu-open'))
  // Block background gestures without hiding the document scrollbar.
  const preventBackgroundScroll = (event) => {
    if (!panel.contains(event.target)) event.preventDefault()
  }
  document.addEventListener('wheel', preventBackgroundScroll, { passive: false })
  document.addEventListener('touchmove', preventBackgroundScroll, { passive: false })
  const content = document.getElementById('page-content')
  const wasInert = content?.inert
  if (content) content.inert = true
  const links = [...panel.querySelectorAll('a')]
  links[0]?.focus()
  const keydown = (event) => {
    if (event.key === 'Escape') close()
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key) && !panel.contains(event.target)) {
      event.preventDefault()
    }
    if (event.key !== 'Tab') return
    const items = [trigger, ...links]
    const index = items.indexOf(document.activeElement)
    event.preventDefault()
    items[(index + (event.shiftKey ? -1 : 1) + items.length) % items.length].focus()
  }
  document.addEventListener('keydown', keydown)
  return () => {
    if (content) content.inert = wasInert
    document.removeEventListener('wheel', preventBackgroundScroll)
    document.removeEventListener('touchmove', preventBackgroundScroll)
    document.removeEventListener('keydown', keydown)
    trigger.focus()
  }
}
