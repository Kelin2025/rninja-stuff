import * as React from "react";

import { Box } from "../atoms/Box";
import { Card } from "../atoms/Card";

export const MessageTemplate = ({ nickname, text, controls: Controls }) => {
  return (
    <Card>
      <Box flow="row" cols={["1fr"]}>
        <Box flow="column" justify="space-between">
          <b>{nickname}</b>
          <div>
            <Controls data={{ nickname, text }} />
          </div>
        </Box>
        <div>{text}</div>
      </Box>
    </Card>
  );
};
