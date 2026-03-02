import { computed } from 'vue'

export interface MenuItem {
  id: string
  name: string // 和前端路由的name对应
  path?: string // 路径跳转
  displayName: string // 菜单名字
  locale?: string // 国际化翻译的key
  hideChildrenInMenu?: boolean // 表示这个就是叶子节点。下面的节点就不显示了
  children?: MenuItem[]
}

const menuTree: MenuItem[] = [
  {
    id: '1',
    name: 'home',
    displayName: '首页',
    locale: 'menu.home',
  },
  {
    id: '2',
    name: 'system-management',
    displayName: '系统管理',
    locale: 'menu.system-management',
    children: [
      {
        id: '2-1',
        name: 'user-management',
        displayName: '用户管理',
        locale: 'menu.user-management',
      },
    ],
  },
]

export const useMenuTree = () => {
  const computedMenuTree = computed(() => {
    return menuTree
  })
  return { menuTree: computedMenuTree }
}
