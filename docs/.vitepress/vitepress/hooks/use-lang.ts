import { useRoute } from 'vitepress'
import { DEFAULT_LANG } from '../../constants/lang'
import { computed } from 'vue'

export const useLang = () => {
  const route = useRoute()
  return computed(() => {
    const path = route.data?.relativePath
    let lang: string = DEFAULT_LANG
    if (path?.includes('/')) {
      lang = path.split('/')?.[0] || DEFAULT_LANG
    }
    return lang
  })
}
