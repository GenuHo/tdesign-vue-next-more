import path from 'path'

export const docRoot = path.join(__dirname, '../../')

export const docVitepressConfigRoot = path.join(docRoot, '/.vitepress')

export const docSrcRoot = path.join(docRoot, '/src')

export const docExamplesRoot = path.join(docRoot, '/examples')

export const docLocaleRoot = path.join(docVitepressConfigRoot, '/locale')
