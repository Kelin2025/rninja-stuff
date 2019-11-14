import * as React from "react";
import styled, { css } from "styled-components";

const StyledRoot = styled.div`
  display: grid;
  height: 100%;

  ${props => {
    if (props.hasSidebar) {
      return css`
        grid-template-areas: "header header" "sidebar children";
        grid-template-columns: 300px 1fr;
        grid-template-rows: max-content 1fr;
      `;
    }
    return css`
      grid-template-areas: "header" "children";
      grid-template-rows: max-content 1fr;
    `;
  }}
`;

const HeaderSlot = styled.header`
  grid-area: header;
`;

const SidebarSlot = styled.header`
  background: #1f1f1f;
  grid-area: sidebar;
  overflow: overlay;
  padding: 15px;
`;

const ChildrenSlot = styled.header`
  grid-area: children;
  overflow: overlay;
  padding: 15px;
`;

export const RootTemplate = ({ header, sidebar, children }) => {
  return (
    <StyledRoot hasSidebar={!!sidebar}>
      <HeaderSlot>{header}</HeaderSlot>
      {(sidebar && <SidebarSlot>{sidebar}</SidebarSlot>) || null}
      <ChildrenSlot>{children}</ChildrenSlot>
    </StyledRoot>
  );
};
