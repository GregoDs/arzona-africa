/** A scroll-shaped network, rendered only while the scene is in view. */
export function initAboutCanvas(section) {
  const stage = section.querySelector('.about-canvas-stage')
  const track = section.querySelector('.about-canvas-scroll')
  const canvas = section.querySelector('canvas')
  const context = canvas.getContext('2d')
  if (!context) return () => {}
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let width = 0
  let height = 0
  let frame = 0
  let visible = false
  let rotation = 0
  const pointer = { x: 0, y: 0 }
  const points = Array.from({ length: 180 }, (_, index) => {
    const y = 1 - (index / 179) * 2
    const radius = Math.sqrt(1 - y * y)
    const angle = index * Math.PI * (3 - Math.sqrt(5))
    return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius }
  })
  const draw = () => {
    frame = 0
    context.clearRect(0, 0, width, height)
    const progress = motion.matches ? .4 : Math.max(0, Math.min(1, -track.getBoundingClientRect().top / Math.max(1, track.offsetHeight - height)))
    const angle = rotation + progress * 1.3 + pointer.x * .15
    const size = Math.min(width * .27, height * .34)
    const cx = width < 700 ? width * .62 : width * .76
    const cy = height * .55
    const projected = points.map(point => {
      const x = point.x * Math.cos(angle) - point.z * Math.sin(angle)
      const z = point.x * Math.sin(angle) + point.z * Math.cos(angle)
      const scale = 1 + z * .18
      return { x: cx + x * size * scale, y: cy + point.y * size * scale + pointer.y * 12, z }
    })
    projected.forEach((point, index) => {
      for (let next = index + 1; next < projected.length; next++) {
        const other = projected[next]
        const distance = Math.hypot(point.x - other.x, point.y - other.y)
        if (distance > size * .23 || Math.abs(point.z - other.z) > .5) continue
        context.strokeStyle = `rgba(20,61,43,${(1 - distance / (size * .23)) * .18})`
        context.beginPath()
        context.moveTo(point.x, point.y)
        context.lineTo(other.x, other.y)
        context.stroke()
      }
      context.fillStyle = index % 9 === 0 ? '#a88a36' : `rgba(20,61,43,${.25 + (point.z + 1) * .3})`
      const dot = point.z > 0 ? 3 : 1.5
      context.fillRect(point.x, point.y, dot, dot)
    })
    if (visible && !motion.matches) {
      rotation += .0012
      frame = requestAnimationFrame(draw)
    }
  }
  const requestDraw = () => {
    if (!frame) frame = requestAnimationFrame(draw)
  }
  const resize = new ResizeObserver(() => {
    width = stage.clientWidth
    height = stage.clientHeight
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * ratio
    canvas.height = height * ratio
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    requestDraw()
  })
  resize.observe(stage)
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) requestDraw()
    else {
      cancelAnimationFrame(frame)
      frame = 0
    }
  })
  observer.observe(stage)
  const move = event => {
    if (motion.matches) return
    const bounds = stage.getBoundingClientRect()
    pointer.x = (event.clientX - bounds.left) / width - .5
    pointer.y = (event.clientY - bounds.top) / height - .5
  }
  const reset = () => { pointer.x = 0; pointer.y = 0 }
  stage.addEventListener('pointermove', move)
  stage.addEventListener('pointerleave', reset)
  motion.addEventListener('change', requestDraw)
  return () => {
    resize.disconnect()
    observer.disconnect()
    cancelAnimationFrame(frame)
    stage.removeEventListener('pointermove', move)
    stage.removeEventListener('pointerleave', reset)
    motion.removeEventListener('change', requestDraw)
  }
}
