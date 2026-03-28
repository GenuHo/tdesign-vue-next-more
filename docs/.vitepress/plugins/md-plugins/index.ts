import type { MarkdownRenderer } from 'vitepress'
import mdContainer from 'markdown-it-container'
import { createDemoContainer } from './demo'
import { replaceAsync } from 'markdown-it-async'

// https://github.com/antfu/markdown-it-async/blob/main/src/index.ts
const encodedPlaceholderRe =
  /%3Cpre%3E%3C!--%3A%3Amarkdown-it-async%3A%3A(\w+)%3A%3A--%3E%3Ccode%3E.*?%3C%2Fcode%3E%3C%2Fpre%3E/g

export const mdPlugin = (md: MarkdownRenderer) => {
  md.use(mdContainer, 'demo', createDemoContainer(md))

  // 解决被encodeURIComponent编码后的代码不能被高亮的问题
  if ('renderAsync' in md) {
    const origin = md.renderAsync.bind(md)
    md.renderAsync = async (...args) => {
      let result = await origin(...args)
      return replaceAsync(result, encodedPlaceholderRe, async (_, id) => {
        const [promise, , lang] = md.placeholderMap.get(id)!
        result = (await promise) || ''
        md.placeholderMap.delete(id)
        if (!result.startsWith('<pre')) {
          result = `<pre><code class="language-${lang}">${result}</code></pre>`
        }
        return encodeURIComponent(result)
      })
    }
  }
}
