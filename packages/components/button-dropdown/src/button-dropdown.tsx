import type { PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'
import {
  type TmButtonDropdownItem,
  type TmButtonDropdownProps,
} from './button-dropdown-type'
import { TM_BUTTON_DROPDOWN_ITEM_OWN_KEYS } from './constants'
import { useNamespace, useLocale } from '@tdesign-vue-next-more/hooks'
import type { DropdownOption, TNode } from 'tdesign-vue-next'

import '@tdesign-vue-next-more/theme-chalk/button-dropdown.less'
import { deleteObjectKeys, getFirstDefined } from '@tdesign-vue-next-more/utils'
import { isFunction, isUndefined } from 'lodash-unified'

const ns = useNamespace('button-dropdown')

const { t } = useLocale()

export default defineComponent({
  name: 'TmButtonDropdown',
  props: {
    max: {
      type: Number,
      default: 3,
    },
    buttons: {
      type: Array as PropType<TmButtonDropdownProps['buttons']>,
      default: () => [] as TmButtonDropdownProps['buttons'][],
    },
    buttonProps: {
      type: Object as PropType<TmButtonDropdownProps['buttonProps']>,
    },
    moreButtonProps: {
      type: Object as PropType<TmButtonDropdownProps['moreButtonProps']>,
    },
  },

  setup(props: TmButtonDropdownProps) {
    // 根据 max 处理出来需要渲染 button 的列表
    const buttons = computed(() => {
      if (props.max && props.buttons && props.buttons.length > props.max) {
        return props.buttons?.slice(0, props.max - 1)
      } else {
        return props.buttons
      }
    })
    // 更多 buttons 的列表
    const moreButtons = computed(() => {
      if (props.max && props.buttons && props.buttons.length > props.max) {
        return props.buttons?.slice(props.max - 1)
      } else {
        return []
      }
    })
    const renderContent = (content: string | TNode) => {
      if (typeof content === 'string') {
        return content
      } else if (isFunction(content)) {
        // TNode 是一个函数，需要调用它并传入 h 函数
        return content(h)
      }
    }
    // TODO 解决 dropdown 菜单没有撑满的问题，tooltip悬浮产生提示区域有问题
    const renderDropdownItem = (buttonChildren: TmButtonDropdownItem[]) => {
      return buttonChildren.map((button) => {
        // 这里还是要分开写才能渲染子菜单
        if (!(button.children && button.children.length > 0)) {
          return (
            <t-dropdown-item
              {...button.dropdownItemProps}
              onClick={(
                dropdownItem: DropdownOption,
                context: {
                  e: MouseEvent
                },
              ) => {
                button?.onClick?.(context.e)
              }}
              disabled={getFirstDefined(
                button?.disabled,
                button?.dropdownItemProps?.disabled,
              )}
            >
              <t-tooltip {...button.tooltipProps}>
                {renderContent(button.content || '')}
              </t-tooltip>
            </t-dropdown-item>
          )
        } else {
          return (
            <t-dropdown-item
              {...button.dropdownItemProps}
              onClick={(
                dropdownItem: DropdownOption,
                context: {
                  e: MouseEvent
                },
              ) => {
                button?.onClick?.(context.e)
              }}
              disabled={getFirstDefined(
                button?.disabled,
                button?.dropdownItemProps?.disabled,
              )}
            >
              <t-tooltip {...button.tooltipProps}>
                {renderContent(button.content || '')}
              </t-tooltip>
              <t-dropdown-menu>
                {renderDropdownItem(button.children)}
              </t-dropdown-menu>
            </t-dropdown-item>
          )
        }
      })
    }
    // 处理出来button的传参
    const getButtonProps = (button: TmButtonDropdownItem) => {
      const buttonProps = {
        ...props.buttonProps,
        ...button,
      }
      deleteObjectKeys(buttonProps, TM_BUTTON_DROPDOWN_ITEM_OWN_KEYS)
      return buttonProps
    }
    const renderButtons = () => {
      return buttons.value?.map((button) => {
        const buttonProps = getButtonProps(button)

        if (!(button.children && button.children.length > 0)) {
          return (
            <t-tooltip {...button.tooltipProps}>
              <t-button {...buttonProps}></t-button>
            </t-tooltip>
          )
        } else {
          return (
            <t-dropdown {...button.dropdownProps}>
              {{
                default: () => (
                  <t-tooltip {...button.tooltipProps}>
                    <t-button {...buttonProps}>
                      {{
                        suffix: () => <chevron-down-icon></chevron-down-icon>,
                      }}
                    </t-button>
                  </t-tooltip>
                ),
                dropdown: () => renderDropdownItem(button.children || []),
              }}
            </t-dropdown>
          )
        }
      })
    }
    const renderMoreButtons = () => {
      if (moreButtons.value && moreButtons.value.length > 0) {
        const buttonProps = getButtonProps(props.moreButtonProps || {})
        return (
          <t-dropdown {...props?.moreButtonProps?.dropdownProps}>
            {{
              default: () => (
                <t-tooltip {...props?.moreButtonProps?.tooltipProps}>
                  <t-button
                    {...buttonProps}
                    content={
                      isUndefined(props.moreButtonProps?.content)
                        ? t('tm.buttonDropdown.more')
                        : renderContent(props.moreButtonProps.content)
                    }
                    suffix={
                      props.moreButtonProps?.suffix ??
                      (() => <chevron-down-icon></chevron-down-icon>)
                    }
                  ></t-button>
                </t-tooltip>
              ),
              dropdown: () => renderDropdownItem(moreButtons.value || []),
            }}
          </t-dropdown>
        )
      }
    }
    return () => (
      <div class={ns.b()}>
        {renderButtons()}
        {renderMoreButtons()}
      </div>
    )
  },
})
