import * as React from "react";
import styled from "styled-components";

const TitleSlot = styled.div`
  background: #7030c2;
  padding: 10px;
`;

const ChildrenSlot = styled.div`
  background: #100918;
  color: #ff37a3;
  padding: 10px;
`;

const Inner = styled.div`
  border-radius: 5px;
  overflow: hidden;
`;

const OverlayCardView = ({ title, children, className }) => {
  return (
    <div className={className}>
      <Inner>
        <TitleSlot>{title}</TitleSlot>
        <ChildrenSlot>{children}</ChildrenSlot>
      </Inner>
    </div>
  );
};

export const OverlayCard = styled(OverlayCardView)`
  background: #ff559c;
  border-radius: 10px;
  padding: 5px;
`;
