import * as React from "react"

const getStyle = (el, styleName) => {
  return getComputedStyle(el)[styleName]
}

const getOffset = el => {
  if (!el) {
    return { top: 0, left: 0 }
  }
  const rect = el.getBoundingClientRect()
  const doc = el.ownerDocument
  if (!doc) throw new Error("Unexpectedly missing <document>.")
  const win = doc.defaultView || doc.parentWindow

  const winX =
    win.pageXOffset !== undefined
      ? win.pageXOffset
      : (doc.documentElement || doc.body.parentNode || doc.body).scrollLeft
  const winY =
    win.pageYOffset !== undefined
      ? win.pageYOffset
      : (doc.documentElement || doc.body.parentNode || doc.body).scrollTop

  return {
    top: rect.top + winX,
    left: rect.left + winY,
    width: rect.width,
    height: rect.height
  }
}

const getPosition = el => {
  if (!el) {
    return { top: 0, left: 0, width: 0, height: 0 }
  }
  let offset = getOffset(el)
  let parentOffset = { top: 0, left: 0 }
  const marginTop = parseInt(getStyle(el, "marginTop")) || 0
  const marginLeft = parseInt(getStyle(el, "marginLeft")) || 0

  if (getStyle(el, "position") === "fixed") {
    offset = el.getBoundingClientRect()
  } else {
    const doc = el.ownerDocument

    let offsetParent = el.offsetParent || doc.documentElement

    while (
      offsetParent &&
      (offsetParent === doc.body || offsetParent === doc.documentElement)
    ) {
      offsetParent = offsetParent.parentNode
    }

    if (offsetParent && offsetParent !== el && offsetParent.nodeType === 1) {
      parentOffset = getOffset(offsetParent)
      parentOffset.top +=
        parseInt(getStyle(offsetParent, "borderTopWidth")) || 0
      parentOffset.left +=
        parseInt(getStyle(offsetParent, "borderLeftWidth")) || 0
    }
  }

  return {
    top: offset.top - marginTop,
    left: offset.left - marginLeft,
    width: offset.width,
    height: offset.height
  }
}

const usePosition = ref => {
  let { top, left, width, height } = getPosition(ref.current)
  let [ElementPosition, setElementPosition] = React.useState({
    top: top,
    left: left,
    width: width,
    height: height
  })

  function handleChangePosition() {
    if (ref && ref.current) {
      setElementPosition(getPosition(ref.current))
    }
  }

  React.useLayoutEffect(() => {
    handleChangePosition()
    window.addEventListener("resize", handleChangePosition)

    return () => {
      window.removeEventListener("resize", handleChangePosition)
    }
  }, [ref.current])

  return ElementPosition
}

const useDropdownPosition = (activatorRef, contentRef) => {
  const activator = usePosition(activatorRef)
  const content = usePosition(contentRef)

  const coords = React.useMemo(() => {
    let left, top

    left = activator.left + activator.width / 2
    if (
      activator.top + activator.height + content.height <
      document.scrollingElement.offsetHeight
    ) {
      top = activator.top + activator.height
    } else {
      top = activator.top - content.height
    }
    return {
      left,
      top
    }
  }, [activatorRef.current, contentRef.current])

  return coords
}

const useDropdown = (isOpened, activatorRef, contentRef) => {
  const [state, setState] = React.useState({ top: "-9999px", left: "-9999px" })
  const shouldDisplay = React.useMemo(
    () => isOpened && activatorRef.current && contentRef.current,
    [isOpened, activatorRef.current, contentRef.current]
  )

  React.useEffect(() => {
    const contentPos = getPosition(contentRef.current)
    const activatorPos = getPosition(activatorRef.current)

    let left, top

    left = activatorPos.left + activatorPos.width / 2
    if (
      activatorPos.top + activatorPos.height + contentPos.height <
      document.scrollingElement.offsetHeight
    ) {
      top = activatorPos.top + activatorPos.height
    } else {
      top = activatorPos.top - contentPos.height
    }

    setState({ left, top })
  }, [isOpened, activatorRef.current, contentRef.current])

  return [shouldDisplay, state]
}

export { usePosition, useDropdown, useDropdownPosition }
