// TODO 待优化性能
import { cloneDeep } from 'lodash-unified'
import type {
  TmCompositeSearchPayload,
  TmCompositeSearchPayloadValue,
} from '../composite-search-type'
import { ref, computed } from 'vue'

interface UseCompositeSearchOptions {
  /** 搜索参数变化时的回调 */
  onSearchChange?: (
    params: Record<string, TmCompositeSearchPayloadValue>,
  ) => void
}

/**
 * 组合搜索 Hook，用于管理多个搜索条件的组合查询
 * 提供搜索条件的增删改查功能，并维护搜索负载的状态
 *
 * @param {UseCompositeSearchOptions} - 可选配置选项
 *
 * @returns {Object} 返回组合搜索相关的状态和方法
 * @returns {ComputedRef<TmCompositeSearchPayload[]>} return.searchPayloads - 当前所有搜索负载的计算属性
 * @returns {Function} return.addSearchPayload - 添加或更新搜索负载
 * @returns {Function} return.removeSearchPayload - 移除指定搜索负载
 * @returns {Function} return.clearSearchPayloads - 清空所有搜索负载
 * @returns {Function} return.getSearchParams - 获取深拷贝后的搜索参数对象
 *
 * @example
 * const {
 *   searchPayloads,
 *   addSearchPayload,
 *   removeSearchPayload,
 *   clearSearchPayloads,
 *   getSearchParams
 * } = useCompositeSearch({
 *   onSearchChange: (params) => {
 *     console.log('搜索参数变化:', params);
 *     // 执行搜索逻辑
 *   }
 * })
 */
export const useCompositeSearch = (options?: UseCompositeSearchOptions) => {
  const { onSearchChange } = options || {}

  /**
   * 存储搜索负载的响应式数组
   * @type {Ref<TmCompositeSearchPayload[]>}
   */
  const searchPayloads = ref<TmCompositeSearchPayload[]>([])

  /**
   * 基于 searchPayloads 的计算属性，提供只读访问
   * @type {ComputedRef<TmCompositeSearchPayload[]>}
   */
  const computedSearchPayloads = computed(() => {
    return searchPayloads.value
  })

  /**
   * 内部辅助函数：更新搜索负载并触发回调
   * @param {TmCompositeSearchPayload[]} newPayloads - 新的搜索负载数组
   */
  const updateSearchPayloads = (newPayloads: TmCompositeSearchPayload[]) => {
    searchPayloads.value = newPayloads
    // 在搜索负载发生变更时触发回调
    onSearchChange?.(getSearchParams())
  }

  /**
   * 添加或更新搜索负载
   * 如果已存在相同 field 的负载，则更新该位置的数据；
   * 否则在数组末尾追加新的负载
   * @param {TmCompositeSearchPayload} searchPayload - 要添加或更新的搜索负载对象
   */
  const addSearchPayload = (searchPayload: TmCompositeSearchPayload) => {
    const index = searchPayloads.value.findIndex(
      (item) => item.field === searchPayload.field,
    )
    if (index > -1) {
      // 更新已存在的搜索条件
      updateSearchPayloads([
        ...searchPayloads.value.slice(0, index),
        searchPayload,
        ...searchPayloads.value.slice(index + 1),
      ])
    } else {
      // 添加新的搜索条件
      updateSearchPayloads([...searchPayloads.value, searchPayload])
    }
  }

  /**
   * 移除指定 field 的搜索负载
   * @param {TmCompositeSearchPayload} searchPayload - 要移除的搜索负载对象，根据其 field 属性进行匹配
   */
  const removeSearchPayload = (searchPayload: TmCompositeSearchPayload) => {
    updateSearchPayloads(
      searchPayloads.value.filter((item) => item.field !== searchPayload.field),
    )
  }

  /**
   * 清空所有搜索负载，重置为空数组
   */
  const clearSearchPayloads = () => {
    updateSearchPayloads([])
  }

  /**
   * 获取当前所有搜索负载的深拷贝对象
   * 返回以 field 为键、value 为值的普通对象
   * @returns {Record<string, TmCompositeSearchPayloadValue>} 以搜索字段名为键的搜索参数对象
   */
  const getSearchParams = (): Record<string, TmCompositeSearchPayloadValue> => {
    const searchParams: Record<string, TmCompositeSearchPayloadValue> = {}
    searchPayloads.value.forEach((searchPayload) => {
      searchParams[searchPayload.field] = cloneDeep(searchPayload.value)
    })
    return searchParams
  }

  return {
    searchPayloads: computedSearchPayloads,
    addSearchPayload,
    removeSearchPayload,
    clearSearchPayloads,
    getSearchParams,
  }
}
