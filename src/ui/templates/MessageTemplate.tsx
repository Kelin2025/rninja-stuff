import * as React from "react";

import { Box } from "../atoms/Box";
import { Card } from "../atoms/Card";

export const MessageTemplate = ({ id, nickname, text, controls: Controls }) => {
  return (
    <Card>
      <Box flow="row" cols={["1fr"]}>
        <Box flow="column" justify="space-between">
          <b>{nickname}</b>
          <div>
            <Controls data={{ id, nickname, text }} />
          </div>
        </Box>
        <div>{text}</div>
      </Box>
    </Card>
  );
};
