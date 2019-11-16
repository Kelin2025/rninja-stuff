import * as React from "react";
import styled from "styled-components";
import classnames from "classnames";
import { darken } from "polished";

import { theme } from "../theme";
import { forEachClass } from "~lib/theme-utils";

const ButtonView = ({
  href,
  children,
  type = "primary",
  className,
  bordered,
  ...props
}) => {
  const Tag = href ? "a" : "button";
  const tagProps = { href, ...props };

  return (
    <Tag className={classnames(className, type, { bordered })} {...tagProps}>
      {children && <span>{children}</span>}
    </Tag>
  );
};

export const Button = styled(ButtonView)`
  align-items: center;
  background: none;
  border: 2px solid;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  height: 40px;
  justify-content: center;
  line-height: 16px;
  outline: none;
  padding: 10px 30px;
  text-decoration: none;
  transition: background 0.2s ease-out, border-color 0.2s ease-out,
    color 0.2s ease-out;
  white-space: nowrap;

  > span {
    align-items: center;
    display: inline-flex;
    justify-content: center;
  }

  > * {
    margin: 0 5px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${forEachClass(theme.buttons, button => ({
    color: button.color,
    background: button.bgColor,
    borderColor: button.bgColor
  }))}

  &:hover {
    ${forEachClass(theme.buttons, button => ({
      background: darken(0.05, button.bgColor),
      borderColor: darken(0.05, button.bgColor)
    }))}
  }

  &.bordered.bordered {
    background: none;

    &:hover {
      background: none;
    }
  }
`;
