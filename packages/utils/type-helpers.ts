/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
export type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never

/**
 * LastInUnion<1 | 2> = 2.
 */
type LastInUnion<U> =
  UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (
    x: infer L,
  ) => 0
    ? L
    : never

/**
 * 这个顺序不能保证
 * UnionToTuple<1 | 2> = [1, 2].
 */
type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last]

/**
 * 如果Tuple中含有Union所有元素，并且不多也不少，就返回Tuple，否则返回never
 * @param Union - 目标联合类型
 * @param Tuple - 待校验的元组类型
 */
export type StrictUnionTuple<Union, Tuple extends readonly Union[]> = [
  Union,
] extends [Tuple[number]]
  ? Tuple['length'] extends UnionToTuple<Union>['length']
    ? Tuple
    : never
  : never

export type OwnKeysStrictUnionTuple<
  O1 extends object,
  O2 extends object,
  Tuple extends readonly (keyof Omit<O1, keyof O2>)[],
> = StrictUnionTuple<keyof Omit<O1, keyof O2>, Tuple>

// 提取可选属性的键
export type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never
}[keyof T]
