import { readdir, readFile, access } from 'node:fs/promises'
import { join } from 'node:path'

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? files(join(directory, entry.name))
    : join(directory, entry.name)))).flat()
}

const html = await readFile('dist/index.html', 'utf8')
const references = new Set(['/arzona-favicon.svg'])
for (const file of [...await files('src'), 'dist/index.html']) {
  if (!/\.(jsx?|css|html)$/.test(file)) continue
  const text = await readFile(file, 'utf8')
  for (const match of text.matchAll(/['"(](\/(?:images|fonts|assets)\/[^'"`\s)]+)/g)) {
    if (!match[1].includes('${')) references.add(match[1])
  }
}
// Dynamic carousel paths also need to exist in the deployment output.
const clients = await readFile('src/components/clients/Clients.jsx', 'utf8')
for (const match of clients.split('const reasons')[0].matchAll(/\['[^']+', '([^']+)'\]/g)) {
  references.add(`/images/clients/${match[1]}.svg`)
}
for (const reference of references) {
  const path = join('dist', reference.split(/[?#]/)[0])
  await access(path)
  // macOS may accept incorrect case; Linux hosting will not.
  let directory = 'dist'
  for (const part of reference.slice(1).split('/')) {
    if (!(await readdir(directory)).includes(part)) throw new Error(`Incorrect asset case: ${reference}`)
    directory = join(directory, part)
  }
}
if (!html.includes('href="/arzona-favicon.svg"')) throw new Error('Missing Arzona favicon')
if (/localhost|\/src\/main|vite\.svg|\/favicon\.svg/.test(html)) throw new Error('Development reference in built HTML')
const config = JSON.parse(await readFile('vercel.json', 'utf8'))
for (const route of ['/about-us', '/about-us/', '/services', '/services/']) {
  if (!config.rewrites.some(rule => rule.source === route && rule.destination === '/index.html')) throw new Error(`Missing route: ${route}`)
}
console.log(`Verified ${references.size} deployed asset paths, Arzona favicon and Vercel page routes.`)
