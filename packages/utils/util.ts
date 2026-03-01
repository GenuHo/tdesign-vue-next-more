import { isUndefined } from 'lodash-unified'
import type { OptionalKeys } from './type-helpers'

// 连续的一系列参数，取到第一个不是undefined的数据进行返回
export function getFirstDefined(...args: any[]) {
  for (let i = 0; i < args.length; i++) {
    if (!isUndefined(args[i])) {
      return args[i]
    }
  }
}

// 删除对象中的某些属性
export const deleteObjectKeys = <T, U extends OptionalKeys<T>>(
  obj: T,
  keys: U[],
) => {
  keys.forEach((key) => delete obj[key])
}
