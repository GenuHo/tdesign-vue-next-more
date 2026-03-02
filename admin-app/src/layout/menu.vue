<script lang="tsx">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores'
import { listenerRouteChange } from '@/utils/route-listener'
import { openWindow, regexUrl } from '@/utils'
import { useMenuTree, type MenuItem } from './menu'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  emit: ['collapse'],
  setup() {
    const { t } = useI18n()
    const appStore = useAppStore()
    const router = useRouter()
    const { menuTree } = useMenuTree()
    const collapsed = computed(() => {
      return appStore.menuCollapse
    })

    const isMobile = computed(() => {
      return appStore.device === 'mobile'
    })

    const openKeys = ref<string[]>([])
    const selectedKey = ref<string>()
    const findMenuOpenKeys = (target: string) => {
      const result: string[] = []
      let isFind = false
      const backtrack = (item: MenuItem, keys: string[]) => {
        if (item.name === target) {
          isFind = true
          result.push(...keys)
          return
        }
        if (item.children?.length) {
          item.children.forEach((childItem) => {
            backtrack(childItem, [...keys, childItem.name as string])
          })
        }
      }
      menuTree.value.forEach((item: MenuItem) => {
        if (isFind) return
        backtrack(item, [item.name as string])
      })
      return result
    }
    const goto = (item: MenuItem) => {
      const path = item.path || ''
      // Open external link
      if (regexUrl.test(path)) {
        openWindow(path)
        return
      }
      selectedKey.value = item.name as string
      // Trigger router change
      router.push({
        name: item.name,
      })
    }
    listenerRouteChange((newRoute) => {
      const menuOpenKeys = findMenuOpenKeys(newRoute.name as string)
      const keySet = new Set([...menuOpenKeys, ...openKeys.value])
      openKeys.value = [...keySet]
      selectedKey.value = newRoute.name as string
    }, true)

    const handleCollapseClick = () => {
      setCollapse(!collapsed.value)
    }

    const setCollapse = (val: boolean) => {
      appStore.updateSettings({ menuCollapse: val })
    }

    const renderSubMenu = () => {
      function travel(menuTree: MenuItem[], nodes = []) {
        if (menuTree) {
          menuTree.forEach((menuItem) => {
            const node =
              menuItem?.children && menuItem?.children.length !== 0 ? (
                <t-submenu
                  value={menuItem.name}
                  v-slots={{
                    title: () => t(menuItem.locale as string),
                  }}
                >
                  {travel(menuItem?.children)}
                </t-submenu>
              ) : (
                <t-menu-item
                  value={menuItem.name}
                  onClick={() => goto(menuItem)}
                >
                  {t(menuItem.locale as string)}
                </t-menu-item>
              )
            nodes.push(node as never)
          })
        }
        return nodes
      }
      const nodes = travel(menuTree.value)
      return nodes
    }
    return () => (
      <t-menu
        value={selectedKey.value}
        expanded={openKeys.value}
        collapsed={!isMobile.value && collapsed.value}
        style="height:100%; width:100%;"
        onExpand={(val: string[]) => (openKeys.value = val)}
        v-slots={{
          operations: !isMobile.value
            ? () => (
                <t-button
                  variant="text"
                  shape="square"
                  onClick={handleCollapseClick}
                  v-slots={{
                    icon: () => <t-icon name="view-list" />,
                  }}
                ></t-button>
              )
            : undefined,
        }}
      >
        {renderSubMenu()}
      </t-menu>
    )
  },
})
</script>
