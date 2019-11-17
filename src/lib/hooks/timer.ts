import * as React from "react";
import { intervalToSeconds, Duration } from "~lib/time-fns";

/** Takes end date and returns ms remaining */
export const useTimeToEnd = (endDate: Date): number => {
  const [remainingTime, setRemainingTime] = React.useState(0);

  React.useEffect(() => {
    const tick = () => {
      const curDate = new Date();
      const timeLeft = +endDate - +curDate;
      if (remainingTime === timeLeft) {
        return;
      }
      if (timeLeft < 0) {
        setRemainingTime(0);
        return;
      }
      setRemainingTime(timeLeft);
    };

    requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(tick);
    };
  }, [endDate, setRemainingTime]);

  return remainingTime;
};

/** Takes start date and duration and returns ms remaining */
export const useTimer = (startDate: Date, duration: Duration): number => {
  const endDate = React.useMemo(
    () => +startDate + intervalToSeconds(duration) * 1000,
    [startDate, duration]
  );

  return useTimeToEnd(new Date(endDate));
};

export const useStaticDate = () => {
  return React.useMemo(() => new Date(), []);
};
