<template>
  <div :class="ns.b()" v-if="hasSearchFields">
    <t-input
      :class="ns.e('search-input')"
      @enter="handleClick"
      ref="searchInputRef"
      v-model="inputValue"
      :placeholder="currentFieldItem?.placeholder"
    >
      <template #label>
        <t-dropdown
          trigger="hover"
          :popupProps="{ onVisibleChange: handlePopupVisibleChange }"
        >
          <span :class="ns.e('search-label')">
            <search-icon :class="ns.e('icon-search')" />
            <span>{{ currentFieldItem?.label }}</span>
            <chevron-down-icon
              :class="ns.e('icon-down')"
              :style="iconDownStyle"
            />
          </span>
          <template #dropdown>
            <t-dropdown-menu>
              <t-dropdown-item
                v-for="item in searchFields"
                :key="item.field"
                @click="handleSelect(item)"
              >
                {{ item.label }}
              </t-dropdown-item>
            </t-dropdown-menu>
          </template>
        </t-dropdown>
      </template>
    </t-input>
    <t-button
      :class="ns.e('search-button')"
      theme="primary"
      @click="handleClick"
    >
      {{ t('tm.compositeSearch.search') }}
    </t-button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useTemplateRef, watch } from 'vue'
import { useNamespace, useLocale } from '@tdesign-vue-next-more/hooks'
import type {
  TmCompositeSearchProps,
  TmCompositeSearchFieldItem,
  TmCompositeSearchInputPayload,
} from './composite-search-type'
import { Input as TInput } from 'tdesign-vue-next'

defineOptions({
  name: 'TmCompositeSearch',
})

const { t } = useLocale()

const ns = useNamespace('composite-search')

const props = withDefaults(defineProps<TmCompositeSearchProps>(), {
  searchFields: () => [],
})

const currentFieldItem = ref<TmCompositeSearchFieldItem | null>(null)

watch(
  props.searchFields,
  () => {
    if (props.searchFields && props.searchFields.length > 0) {
      currentFieldItem.value = props.searchFields[0]
    } else {
      currentFieldItem.value = null
    }
  },
  {
    immediate: true,
  },
)

// TODO 下面的focus类型报错，any类型待替换
const searchInputRef = useTemplateRef<any>('searchInputRef')
const handleSelect = (item: TmCompositeSearchFieldItem) => {
  currentFieldItem.value = item
  searchInputRef.value?.focus()
}

// 是否有searchFields
const hasSearchFields = computed(
  () => props.searchFields && props.searchFields.length > 0,
)

const isPopupVisible = ref(false)
const handlePopupVisibleChange = (visible: boolean) => {
  isPopupVisible.value = visible
}
const iconDownStyle = computed(() => ({
  transform: isPopupVisible.value ? 'rotate(180deg)' : 'rotate(0deg)',
}))

const inputValue = ref('')
const handleClick = () => {
  if (!currentFieldItem.value) return
  if (currentFieldItem.value.type === 'input' && inputValue.value) {
    props.onSearch?.({
      fieldItem:
        currentFieldItem.value as TmCompositeSearchInputPayload['fieldItem'],
      value: inputValue.value.trim(),
      label: inputValue.value.trim(),
    })
    inputValue.value = ''
    return
  } else if (currentFieldItem.value.type === 'select') {
    return
  }
}
</script>

<style lang="less">
@import url('@tdesign-vue-next-more/theme-chalk/composite-search.less');
</style>
