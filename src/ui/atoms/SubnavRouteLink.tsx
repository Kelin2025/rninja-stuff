import * as React from "react";
import styled from "styled-components";
import { RouteLink } from "~lib/routing/react";

export const SubnavRouteLink = styled(RouteLink)`
  border-radius: 5px;
  display: block;
  padding: 15px;
  text-decoration: none;
  transition: background 0.2s ease-out;

  &.active {
    background: #2f2f2f;
  }

  &:hover {
    background: #272727;
  }
`;
