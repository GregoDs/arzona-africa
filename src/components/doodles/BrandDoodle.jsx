import './BrandDoodle.css'

const paths = {
  arrow: 'M8 15c39-16 90 0 70 27-15 20-42 0-24-12 21-14 49 8 60 37M96 56l18 11-1-22',
  growth: 'M12 70h100M24 60V43h15v17m15 0V28h15v32m15 0V12h15v48M16 29c26 0 50-13 76-23m-17 0 17 0-3 14',
  orbit: 'M11 39c12-31 98-38 105-10S28 74 12 47c-10-17 53-28 86-18M96 11l3-7m7 14 8-2',
  spark: 'M60 8c0 30-10 34-35 34 25 0 35 5 35 30 0-25 10-30 35-30-25 0-35-4-35-34ZM102 13v14m-7-7h14',
}

export default function BrandDoodle({ kind = 'arrow', className = '' }) {
  return <svg className={`brand-doodle ${className}`} viewBox="0 0 128 80" aria-hidden="true" focusable="false"><path d={paths[kind]} /></svg>
}
