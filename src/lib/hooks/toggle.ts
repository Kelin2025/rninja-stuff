import * as React from "react"

export const useToggle = (initialValue = false) => {
  const [isOpened, set] = React.useState(initialValue)

  return [
    isOpened,
    {
      set,
      open: () => set(true),
      close: () => set(false),
      toggle: () => set(!isOpened)
    }
  ]
}
