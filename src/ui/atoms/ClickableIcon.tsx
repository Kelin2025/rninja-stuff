import * as React from "react";
import styled from "styled-components";

const ClickableIconView = ({ icon: Icon, className, ...props }) => (
  <Icon className={className} {...props} />
);

export const ClickableIcon = styled(ClickableIconView)`
  cursor: pointer;
  font-size: 28px;
  opacity: 0.25;
  transition: opacity 0.2s ease-out;

  &:hover {
    opacity: 0.5;
  }
`;
