import * as React from "react";
import styled from "styled-components";

const ClickableIconView = ({
  icon: Icon,
  className,
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = React.useCallback(() => {
    if (disabled) {
      return;
    }
    onClick();
  }, [onClick, disabled]);

  return <Icon className={className} onClick={handleClick} {...props} />;
};

export const ClickableIcon = styled(ClickableIconView)`
  cursor: pointer;
  font-size: 28px;
  opacity: 0.25;
  transition: opacity 0.2s ease-out;

  &:hover {
    opacity: 0.5;
  }
`;
