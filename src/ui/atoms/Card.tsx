import * as React from "react";
import styled, { css } from "styled-components";

export const Card = styled.div`
  background: #1a1a1a;
  border-radius: 10px;
  padding: 15px;
  transition: background 0.2s ease-out;

  h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  ${props => {
    if (props.isHighlighted) {
      return css`
        background: #1f1f1f;
      `;
    }
    return "";
  }}
`;
