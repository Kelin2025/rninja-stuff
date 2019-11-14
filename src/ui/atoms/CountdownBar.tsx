import * as React from "react";
import { useTimer } from "~lib/hooks";

import { ProgressBar } from "./ProgressBar";
import { intervalToSeconds } from "~lib/time-fns";

export const CountdownBar = ({ startDate, duration, reversed }) => {
  const durationS = intervalToSeconds(duration);
  const durationMs = durationS * 1000;
  const remainingMs = useTimer(startDate, durationS);
  const percentsRemaining = (remainingMs / durationMs) * 100;
  const barProgress = reversed ? percentsRemaining : 100 - percentsRemaining;

  return <ProgressBar progress={barProgress} />;
};
