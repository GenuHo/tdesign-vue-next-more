import { DEFAULT_LANG } from '../constants/lang'
import descriptionLocale from '../locale/pages/description.json'

export const getDescriptionByLang = (lang: string): string => {
  const description = descriptionLocale[lang as keyof typeof descriptionLocale]
    ? descriptionLocale[lang as keyof typeof descriptionLocale]
    : descriptionLocale[DEFAULT_LANG]
  return description.description
}
