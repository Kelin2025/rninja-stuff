import * as React from "react"
import { formatTime, intervalToSeconds } from "~lib/time-fns"

export const Duration = ({ duration, time, format }) => {
  return formatTime(
    time || intervalToSeconds(duration || 0) * 1000,
    format || "{h}h {m}m {s}s"
  )
}
