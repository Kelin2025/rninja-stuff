import * as React from "react";
import styled from "styled-components";

const FlatInputView = React.forwardRef(
  ({ onChange, className, ...props }, ref) => (
    <input
      ref={ref}
      onChange={evt => onChange(evt.target.value)}
      className={className}
      {...props}
    />
  )
);

export const FlatInput = styled(FlatInputView)`
  background: none;
  border: 0;
  border-bottom: 2px solid #2f2f2f;
  color: #fff;
  font-size: 16px;
  line-height: 20px;
  outline: none;
  padding: 15px 0 5px;
  transition: border-color 0.25s ease-out;

  &:focus {
    border-bottom-color: #3c7eff;
  }

  &.invalid {
    border-bottom-color: #3c7eff;
  }
`;
