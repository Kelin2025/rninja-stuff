import * as React from "react";
import styled, { css } from "styled-components";

import { ClickableLink } from "./ClickableLink";

const SubnavLinkView = ({ className, children, active, onClick }) => {
  return (
    <ClickableLink active={active} className={className} onClick={onClick}>
      {children}
    </ClickableLink>
  );
};

export const SubnavLink = styled(SubnavLinkView)`
  border-radius: 5px;
  display: block;
  padding: 15px;
  text-decoration: none;
  transition: background 0.2s ease-out;

  ${props => {
    if (props.active) {
      return css`
        background: #2f2f2f;
      `;
    }
    return "";
  }}

  &:hover {
    background: #272727;
  }
`;
