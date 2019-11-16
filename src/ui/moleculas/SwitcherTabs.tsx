import * as React from "react";
import styled from "styled-components";
import classnames from "classnames";

import { Box } from "../atoms/Box";

const SwitcherTabView = ({ option, active, disabled, onClick, className }) => (
  <div
    onClick={() => !disabled && onClick(option.value)}
    className={classnames(className, {
      active,
      disabled
    })}
  >
    {option.label}
  </div>
);

export const SwitcherTab = styled(SwitcherTabView)`
  border-bottom: 2px solid #2f2f2f;
  cursor: pointer;
  padding: 15px 5px 5px;
  transition: border-color 0.2s ease-out;
  white-space: nowrap;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.25;
  }

  &.active {
    border-color: #ff9900;
  }
`;

export const SwitcherTabs = ({
  value,
  disabled,
  options,
  onChange,
  className
}) => (
  <Box gap={3} flow="column" className={className}>
    {options.map(option => (
      <SwitcherTab
        key={option.value}
        active={value === option.value}
        disabled={disabled}
        option={option}
        onClick={onChange}
      />
    ))}
  </Box>
);
