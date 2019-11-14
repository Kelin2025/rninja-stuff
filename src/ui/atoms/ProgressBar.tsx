import * as React from "react";
import styled from "styled-components";

const ProgressBarView = ({ progress, className }) => (
  <div className={className}>
    <div style={{ width: `${progress}%` }}></div>
  </div>
);

export const ProgressBar = styled(ProgressBarView)`
  position: relative;
  height: 8px;
  background: #583c06;
  border-radius: 4px;
  overflow: hidden;

  > div {
    position: absolute;
    top: 0;
    left: 0;
    height: 8px;
    background: #ffa800;
    border-radius: 4px;
  }
`;
