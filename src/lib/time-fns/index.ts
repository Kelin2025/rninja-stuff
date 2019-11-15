import { createStore, createEvent } from "effector";

export type Duration =
  | {
      type: "seconds" | "minutes" | "hours";
      value: number;
    }
  | number;

const timeMultipliers = {
  seconds: 1,
  minutes: 60,
  hours: 3600
};

export const formatTime = (time, format) => {
  let hours = Math.floor(time / 1000 / 3600);
  let minutes = Math.floor(time / 1000 / 60);
  let seconds = Math.floor(time / 1000);
  let miliseconds = Math.floor(time / 10);

  let fHours = Math.floor((time / 1000 / 3600) * 10) / 10;
  let fMinutes = Math.floor((time / 1000 / 60) * 10) / 10;
  let fSeconds = Math.floor((time / 1000) * 10) / 10;

  const lowerFormat = format.toLowerCase();
  const hasHours = lowerFormat.includes("{h}");
  const hasMinutes = lowerFormat.includes("{m}");
  const hasSeconds = lowerFormat.includes("{s}");

  if (hasHours || hasMinutes || hasSeconds) {
    miliseconds = miliseconds % 100;
  }

  if (hasHours || hasMinutes) {
    seconds = seconds % 60;
  }

  if (hasHours) {
    minutes = minutes % 60;
  }

  return format
    .replace("{fH}", `${fHours}`)
    .replace("{fM}", `${fMinutes}`)
    .replace("{fS}", `${fSeconds}`)
    .replace("{H}", `${hours}`.padStart(2, "0"))
    .replace("{M}", `${minutes}`.padStart(2, "0"))
    .replace("{S}", `${seconds}`.padStart(2, "0"))
    .replace("{MS}", `${miliseconds}`.padStart(2, "0"))
    .replace("{h}", `${hours}`)
    .replace("{m}", `${minutes}`)
    .replace("{s}", `${seconds}`)
    .replace("{ms}", `${miliseconds}`);
};

export const intervalToSeconds = interval => {
  if (typeof interval === "object") {
    const normalizedTime = +interval.value || 0;
    const multiplier = timeMultipliers[interval.type || "seconds"];
    const convertedTime = normalizedTime * multiplier;

    return Number.isNaN(convertedTime) ? 0 : convertedTime;
  }
  if (typeof +interval === "number" && !Number.isNaN(+interval)) {
    return +interval;
  }
};

const dateTick = createEvent();

// NOTE: If this shit will lag
// Replace with setInterval(dateTick, 1000)
const rafTick = () => {
  dateTick();
  setTimeout(rafTick, 50);
};

setTimeout(rafTick, 50);

export const $now = createStore<Date>(new Date());

$now.on(dateTick, () => new Date());
