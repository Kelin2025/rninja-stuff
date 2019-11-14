import { Store } from "effector"
import { useStoreMap } from "effector-react"

interface Hook<T, U> {
  (payload: U): T
  <X extends (item: T) => any>(payload: U, cb?: X): ReturnType<typeof cb>
}

export const createUseStoreMap = <T, U, X>({
  store,
  fn,
}: {
  store: Store<T>
  fn: (payload: U, item: T) => X
}) => {
  const hook = (payload, cb) =>
    useStoreMap({
      store: store,
      keys: [payload, cb],
      fn: state => {
        const item = fn(payload, state)
        if (item === undefined) {
          return null
        }
        if (cb !== undefined) {
          const res = cb(item)
          if (res === undefined) {
            throw new Error("createUseStoreMap: Callback returned undefined")
          }
          return cb(item) as ReturnType<typeof cb>
        }
        return item
      },
    })

  return hook as Hook<X, U>
}

export const createUseListItem = <T, U>({
  store,
  check,
}: {
  store: Store<T[]>
  check: (payload: U, item: T, idx: number) => boolean
}) =>
  createUseStoreMap({
    store,
    fn: (payload: U, list) =>
      list.find((item, idx) => check(payload, item, idx)),
  })
