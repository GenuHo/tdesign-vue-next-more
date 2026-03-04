<template>
  <div :class="ns.b()" v-if="tags && tags.length > 0">
    <t-tag
      variant="outline"
      :class="ns.e('tag')"
      closable
      v-for="tag in tags"
      :key="tag.fieldItem.field"
      @close="handleClose(tag)"
    >
      {{ getTagText(tag) }}
    </t-tag>
    <!-- 这里使用t-tag，是为了保持这里的高度和其他tag严格一致 -->
    <t-tag
      :class="[ns.e('operation-tag'), ns.em('operation-tag', 'clear')]"
      @click="handleClear"
    >
      {{ t('tm.compositeSearchTags.clear') }}
    </t-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useNamespace, useLocale } from '@tdesign-vue-next-more/hooks'
import type {
  TmSearchPayload,
  TmSearchPayloadValue,
} from '@tdesign-vue-next-more/components'
import type { TmCompositeSearchTagsProps } from './composite-search-tags-type'

defineOptions({
  name: 'TmCompositeSearchTags',
})

const { t } = useLocale()

const ns = useNamespace('composite-search-tags')

const props = defineProps<TmCompositeSearchTagsProps>()

const tags = ref<TmSearchPayload[]>([])
watch(
  () => tags.value,
  (value) => {
    props?.onChange?.({ tags: value, searchParams: getSearchParams() })
  },
  {
    deep: true,
  },
)

const getTagText = (tag: TmSearchPayload) => {
  let text = tag.fieldItem.label + t('tm.compositeSearchTags.nameLabelSplit')
  if (typeof tag.label === 'string') {
    text = `${text}${tag.label}`
  } else if (Array.isArray(tag.label)) {
    text = `${text}${tag.label.join(t('tm.compositeSearchTags.labelSplit'))}`
  }
  return text
}

// 添加标签，如果遇到fieldItem.field相同的标签，则替换
const addTags = (tag: TmSearchPayload | TmSearchPayload[]) => {
  const array = Array.isArray(tag) ? tag : [tag]
  // 遍历 array 给 tags 添加和替换
  array.forEach((item) => {
    const index = tags.value.findIndex(
      (tag) => tag.fieldItem.field === item.fieldItem.field,
    )
    if (index > -1) {
      tags.value[index] = item
    } else {
      tags.value.push(item)
    }
  })
}

const handleClose = (tag: TmSearchPayload) => {
  tags.value = tags.value.filter(
    (item) => item.fieldItem.field !== tag.fieldItem.field,
  )
}

const handleClear = () => {
  tags.value = []
}

// 获取搜索参数
const getSearchParams = () => {
  const searchParams: Record<string, TmSearchPayloadValue> = {}
  tags.value.forEach((tag) => {
    searchParams[tag.fieldItem.field] = tag.value
  })
  return searchParams
}

defineExpose({
  addTags,
  getSearchParams,
  clear: handleClear,
})
</script>

<style lang="less">
@import url('@tdesign-vue-next-more/theme-chalk/composite-search-tags.less');
</style>
