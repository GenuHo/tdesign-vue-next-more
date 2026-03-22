import type { Plugin } from 'vitepress'
import { docExamplesRoot } from '../../utils/path'
import fs from 'fs'
import path from 'path'
import { camelize } from 'vue'

export const markdownTransformPlugin = (): Plugin => {
  return {
    name: 'tm-md-transform',
    enforce: 'pre',
    async buildStart() {},
    async transform(code, id) {
      if (!id.endsWith('.md')) {
        return
      }
      const componentId = path.basename(id, '.md')
      const imports = getExampleImports(componentId)
      return combineMarkdown(code, [combineScriptSetup(imports)])
    },
  }
}

const combineScriptSetup = (codes: string[]) => {
  return `\n<script setup>
${codes.join('\n')}
</script>`
}

const combineMarkdown = (code: string, headers: string[]) => {
  const frontmatterEnds = code.indexOf('---\n\n')
  let sliceIndex = 0
  if (frontmatterEnds >= 0) {
    sliceIndex = frontmatterEnds + 4
  }
  const codeEndWithFrontmatter = code.endsWith('---\n')
  if (codeEndWithFrontmatter) {
    sliceIndex = code.length
  }
  if (headers.length > 0) {
    code =
      code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex)
  }
  return code
}

const getExampleImports = (componentId: string): string[] => {
  const examplePath = path.resolve(docExamplesRoot, componentId)
  if (!fs.existsSync(examplePath)) {
    return []
  }
  const imports: string[] = []
  const files = fs.readdirSync(examplePath)
  for (const item of files) {
    if (!/\.vue$/.test(item)) continue
    const file = item.replace(/\.vue$/, '')
    const name = camelize(`Tp-${componentId}-${file}`)
    imports.push(
      `import ${name} from '../../../examples/${componentId}/${file}.vue'`,
    )
  }
  return imports
}
