import type { MarkdownRenderer } from 'vitepress'
import { readFileSync } from 'fs'
import path from 'path'
import { docExamplesRoot } from '../../utils/path'

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?: MarkdownRenderer['renderer']['rules']['container']
}

export const createDemoContainer = (md: MarkdownRenderer): ContainerOpts => {
  return {
    validate(params: string) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2] // idx + 1的位置是paragraph_open
        const sourceFile = sourceFileToken.children?.[0].content || ''
        let source = ''
        if (sourceFileToken.type === 'inline') {
          const demoFilePath = path.resolve(
            docExamplesRoot,
            `${sourceFile}.vue`,
          )
          try {
            source = readFileSync(demoFilePath, 'utf-8')
          } catch {
            // TODO 待优化打印
            console.log(`no demo file: ${demoFilePath}`)
          }
        }
        if (!source) {
          return `<Demo>`
        } else {
          const openTag = `<Demo source="${encodeURIComponent(
            md.render(`\`\`\` vue\n${source}\`\`\``),
          )}" path="${sourceFile}" raw-source="${encodeURIComponent(
            source,
          )}" description="${encodeURIComponent(md.render(description))}">
  <template #source><tp-${sourceFile.replaceAll('/', '-')}/></template>`
          return openTag
        }
      } else {
        return `</Demo>\n`
      }
    },
  }
}
