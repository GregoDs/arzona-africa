const drawings = {
  governance: 'M12 3 3 7v2h18V7l-9-4ZM5 11v7m5-7v7m4-7v7m5-7v7M3 21h18M3 18h18',
  service: 'M4 13v-2a8 8 0 0 1 16 0v2M4 11H2v7h4v-7H4m16 0h2v7h-4v-7h2M20 18v2h-6m-4 0h4',
  business: 'M3 20h18M5 17v-5h3v5m3 0V9h3v8m3 0V5h3v12M4 8l5-3 4 1 6-4',
  leadership: 'M9 6a3 3 0 1 0 6 0 3 3 0 1 0-6 0M6 20v-4a6 6 0 0 1 12 0v4M3 10a2 2 0 1 0 0 4m18-4a2 2 0 1 1 0 4M2 21v-3m20 3v-3',
  skills: 'M8 4H4v17h16V4h-4M8 2h8v5H8V2ZM7 11l2 2 3-3m2 2h3M7 17h10',
  digital: 'M3 3h18v13H3V3ZM8 21h8m-4-5v5M8 8l-2 2 2 2m8-4 2 2-2 2m-3-5-2 6',
  house: 'M3 21V7l9-4 9 4v14H3ZM9 21v-6h6v6M7 8v2m5-2v2m5-2v2M7 12v1m10-1v1',
  workshop: 'M4 3h16v10H4V3ZM8 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0M5 23v-1a5 5 0 0 1 10 0v1m2-7h4m-2-3v7M8 7h8m-8 3h5',
  virtual: 'M3 4h18v13H3V4ZM8 21h8m-4-4v4M10 8l5 3-5 3V8Z',
  retreat: 'M2 21 10 7l8 14H2Zm12-8 3-5 6 13h-5M5 5h3m-1-2v4',
  mentor: 'M7 4a3 3 0 1 0 0 6 3 3 0 1 0 0-6M17 7a3 3 0 1 0 0 6 3 3 0 1 0 0-6M2 20v-4a5 5 0 0 1 10 0v4m2 1v-3a4 4 0 0 1 8 0v3M13 3h7m-2-2 2 2-2 2',
}

export default function ServiceIcon({ name, className = '' }) {
  return (
    <svg className={`service-icon ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={drawings[name]} />
    </svg>
  )
}
