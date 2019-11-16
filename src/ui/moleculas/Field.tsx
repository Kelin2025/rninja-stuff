import * as React from "react";
import styled from "styled-components";
import classnames from "classnames";

import { Box } from "../atoms/Box";
import { Label } from "../atoms/Label";

const RequiredText = styled.span`
  color: #cd4040;
  margin-left: 4px;
`;

export const Field = ({ isRequired, label, children, className }) => (
  <Box flow="row" cols={["1fr"]} gap={5} className={classnames(className)}>
    {label && (
      <Label>
        {label}
        {isRequired && <RequiredText>*</RequiredText>}
      </Label>
    )}
    {children}
  </Box>
);
