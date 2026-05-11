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

/**
 * Merges an intersection type into a single unified object type.
 * Resolves TypeScript's display behavior of showing intersection types as multiple objects.
 *
 * @example
 * type A = { a: string };
 * type B = { b: number };
 * type C = A & B; // TypeScript shows as { a: string } & { b: number }
 * type D = MergeType<C>; // Shows as { a: string; b: number }
 *
 * @template O - The object type to be merged
 */
export type MergeType<O> = {
  [P in keyof O]: O[P]
}

/**
 * Creates a type with specific keys made optional while keeping other properties required.
 * Provides more granular control than standard Partial by allowing selective optionalization.
 *
 * @example
 * interface User { id: number; name: string; email?: string }
 * type PartialName = PartialByKeys<User, 'name'>;
 * // Result: { id: number; name?: string; email?: string }
 *
 * @template T - The original type to transform
 * @template K - Keys to make optional (defaults to all keys when not specified)
 */
export type PartialByKeys<T, K extends keyof T = keyof T> = MergeType<
  {
    [P in keyof T as P extends K ? P : never]?: T[P]
  } & {
    [P in keyof T as P extends K ? never : P]: T[P]
  }
>
