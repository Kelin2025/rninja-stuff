import * as React from "react";
import { useTimer } from "~lib/hooks";

import { Duration } from "./Duration";

export const Countdown = ({ startDate, format, duration }) => {
  const curTime = useTimer(startDate, duration);

  return <Duration time={curTime} format={format} />;
};
