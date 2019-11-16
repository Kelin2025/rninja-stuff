import * as React from "react";

import { Box } from "../atoms/Box";
import { NumberInput } from "../atoms/NumberInput";
import { SwitcherTabs } from "./SwitcherTabs";

export const TimeInput = ({
  step,
  value,
  invalid,
  onChange,
  disabled,
  autofocus,
  className
}) => (
  <Box flow="column" className={className}>
    <NumberInput
      autofocus={autofocus}
      disabled={disabled}
      min={0}
      invalid={invalid}
      step={step}
      value={value.value}
      onChange={nextValue =>
        onChange({ type: value.type || "seconds", value: nextValue })
      }
    />
    <SwitcherTabs
      disabled={disabled}
      value={value.type}
      options={[
        { value: "seconds", label: "SS" },
        { value: "minutes", label: "MM" },
        { value: "hours", label: "HH" }
      ]}
      onChange={nextType =>
        onChange({ type: nextType, value: value.value || 0 })
      }
    />
  </Box>
);
