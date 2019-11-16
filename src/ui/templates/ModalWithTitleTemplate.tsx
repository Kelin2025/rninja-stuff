import * as React from "react";
import styled from "styled-components";

import { Box } from "~ui";

const TitleSlot = styled.div`
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const ContentWrapper = styled(Box)`
  max-height: 80vh;
  min-width: 360px;
  overflow: overlay;
  background: #1f1f1f;
  border-radius: 5px;
`;

const ControlsWrapper = styled.div`
  margin: 15px -15px -15px;
  padding: 15px;
  border-top: 1px solid #2a2a2a;
`;

const Wrapper = styled(Box)`
  max-height: calc(100% - 40px);
  max-width: calc(100% - 40px);
  min-width: 400px;
`;

export const ModalWithTitleTemplate = ({
  title,
  raw,
  controls,
  header,
  children
}) => {
  const child = React.useMemo(() => {
    if (raw) {
      return <ContentWrapper cols={["1fr"]}>{raw}</ContentWrapper>;
    }
    return (
      <ContentWrapper
        flow="row"
        gap={0}
        rows={["1fr", "max-content"]}
        cols={["1fr"]}
        padding="15px"
      >
        {header && <div>{header}</div>}
        <div>{children}</div>
        {controls ? <ControlsWrapper>{controls}</ControlsWrapper> : null}
      </ContentWrapper>
    );
  }, [raw, children, controls]);

  return (
    <Wrapper flow="row" rows={["40px", "max-content"]} cols={["1fr"]}>
      <TitleSlot>{title}</TitleSlot>
      {child}
    </Wrapper>
  );
};
