import * as React from "react"
import { equals } from "ramda"
import { useStore } from "effector-react"

import { $route, goTo, $routes } from "../routing"

export const useRoute = () => {
  return useStore($route)
}

export const RouterView = () => {
  const route = useRoute()
  const info = route.routeInfo
  const View = info && info.view

  if (!View) {
    return null
  }

  return <View name={route.name} params={route.params} />
}

export const RouteLink = ({
  name,
  params = {},
  children,
  className = "",
  activeClassName = "active",
  onClick,
  ...props
}) => {
  const currentRoute = useStore($route)
  const allRoutes = useStore($routes)
  const thisRoute = allRoutes[name]

  const isActive = React.useMemo(() => {
    if (!name) {
      return false
    }
    if (thisRoute && thisRoute.isActive) {
      return thisRoute.isActive(currentRoute)
    }
    return name === currentRoute.name && equals(params, currentRoute.params)
  }, [name, params, currentRoute, thisRoute])

  const handleClick = React.useCallback(
    evt => {
      evt.preventDefault()
      if (onClick) {
        onClick()
      }
      if (name) {
        goTo({
          name: name,
          params: params
        })
      }
    },
    [name, params]
  )

  const realClassName = `${className}${isActive ? ` ${activeClassName}` : ""}`

  return (
    <a href="#!" onClick={handleClick} className={realClassName} {...props}>
      {children}
    </a>
  )
}
