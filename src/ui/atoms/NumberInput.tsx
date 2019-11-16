import * as React from "react";

import { FlatInput } from "./FlatInput";

const between = (min, max, val) =>
  Math.round(Math.max(min, Math.min(max, val)) * 100) / 100;

export const NumberInput = ({
  min,
  max,
  value,
  invalid,
  autofocus,
  onChange
}) => {
  const input = React.useRef();

  React.useEffect(() => {
    if (autofocus) {
      input.current.focus();
      input.current.select();
    }
  }, []);

  const changeTo = value => {
    onChange(
      between(
        min !== undefined ? min : 0,
        max !== undefined ? max : Infinity,
        value
      )
    );
  };

  return (
    <FlatInput
      ref={input}
      regexp={/^([0-9]*[.])?[0-9]+$/}
      invalid={invalid}
      value={value}
      onChange={onChange}
    />
  );
};
