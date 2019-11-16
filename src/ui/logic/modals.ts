import * as React from "react"
import {
  Event,
  Store,
  Effect,
  forward,
  createEvent,
  createStore,
  createEffect,
} from "effector"
import { modalEasing } from "./animation"

type openModalT = Effect<string, string, any>
type closeModalT = Effect<string, string, any>
type $isModalOpenedT = Store<{ [key: string]: boolean }>
type $isModalLockedT = Store<{ [key: string]: boolean }>
type $isModalAnimatingT = Store<{ [key: string]: boolean }>
type modalOpenedT = Event<string>
type modalClosedT = Event<string>

export const openModal: openModalT = createEffect("openModal")
export const closeModal: closeModalT = createEffect("closeModal")
export const modalOpenStarted: modalOpenedT = createEvent("modalOpenStarted")
export const modalCloseStarted: modalClosedT = createEvent("modalOpenStarted")
export const modalOpened = openModal.done.map(r => r.params)
export const modalClosed = closeModal.done.map(r => r.params)

export const $isModalOpened: $isModalOpenedT = createStore({})
export const $isModalLocked: $isModalLockedT = createStore({})
export const $isModalAnimating: $isModalAnimatingT = createStore({})

// NOTE: +30ms to not cause no-op's in component hooks
openModal.use(() => new Promise(r => setTimeout(r, modalEasing.duration + 30)))
closeModal.use(() => new Promise(r => setTimeout(r, modalEasing.duration + 30)))

forward({
  from: openModal,
  to: modalOpenStarted,
})

forward({
  from: closeModal,
  to: modalCloseStarted,
})

$isModalOpened
  .on(openModal, (state, name) => ({ ...state, [name]: true }))
  .on(closeModal, (state, name) => ({ ...state, [name]: false }))

$isModalAnimating
  .on(openModal, (state, name) => ({ ...state, [name]: true }))
  .on(closeModal, (state, name) => ({ ...state, [name]: true }))
  .on(modalOpened, (state, name) => ({ ...state, [name]: false }))
  .on(modalClosed, (state, name) => ({ ...state, [name]: false }))

export const onModalOpen = (name, cb) =>
  openModal.watch(openedName => {
    if (name === "*" || name === openedName) {
      cb(openedName)
    }
  })

export const onModalClose = (name, cb) =>
  closeModal.watch(openedName => {
    if ($isModalLocked.getState()[name]) {
      return
    }
    if (name === "*" || name === openedName) {
      cb(openedName)
    }
  })

export const modal = (name: string) => {
  const res = {
    openOn: <T>(evt: Event<T>, filter: (p: T) => boolean = () => true) => {
      forward({
        from: evt.filter({ fn: filter }).map(() => name),
        to: openModal,
      })
      return res
    },
    closeOn: <T>(evt: Event<T>, filter: (p: T) => boolean = () => true) => {
      forward({
        from: evt.filter({ fn: filter }).map(() => name),
        to: closeModal,
      })
      return res
    },
  }
  return res
}
