import type { PrimaryTableCol } from 'tdesign-vue-next'
import { computed, ref } from 'vue'

// TODO 待优化相关计算逻辑
export const useColumnCalcWidth = (column: PrimaryTableCol) => {
  // 生成一个随机字符串
  const random = Math.random().toString(36).substring(2, 10)
  const thClass = `th-class-${random}`
  const tdClass = `td-class-${random}`

  const width = ref<number>(80)

  const calcWidth = () => {
    const tdNodes = document.getElementsByClassName(tdClass)
    let maxWidth = 0
    Array.from(tdNodes).forEach((tdNode) => {
      // 获取子节点的总宽度，使用range的方式
      const range = document.createRange()
      range.setStart(tdNode, 0)
      range.setEnd(tdNode, tdNode.childNodes.length)
      const rangeWidth = range.getBoundingClientRect().width
      const style = window.getComputedStyle(tdNode)
      const paddingLeft = style.getPropertyValue('padding-left') || '0'
      const paddingRight = style.getPropertyValue('padding-right') || '0'
      const allWidth =
        rangeWidth + parseFloat(paddingLeft) + parseFloat(paddingRight)
      maxWidth = Math.max(maxWidth, allWidth)
    })
    width.value = Math.max(maxWidth, width.value)
    console.log('maxWidth', maxWidth)
  }

  const c = computed(() => {
    const className: PrimaryTableCol['className'] = [
      ({ type }) => {
        if (type === 'th') {
          return thClass
        } else if (type === 'td') {
          return tdClass
        }
      },
    ]
    if (column.className) {
      className.push(column.className)
    }
    const c: PrimaryTableCol = {
      ...column,
      cell: (h, p) => {
        const r = () => {
          if (typeof column.cell === 'string') {
            return column.cell
          } else if (typeof column.cell === 'function') {
            return column.cell(h, p)
          }
        }
        return <div style="display: inline-flex">{r()}</div>
      },
      width: width.value,
      className,
    }
    return c
  })
  return {
    column: c,
    calcWidth,
  }
}
