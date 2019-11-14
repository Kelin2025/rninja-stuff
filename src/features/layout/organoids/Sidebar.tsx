import * as React from "react";
import { Box, SubnavRouteLink } from "~ui";

export const Sidebar = () => {
  return (
    <Box flow="row" cols={["1fr"]}>
      <h2>Polls</h2>
      <SubnavRouteLink name="home">Polls</SubnavRouteLink>
      <SubnavRouteLink name="pollsTemplates">Polls Templates</SubnavRouteLink>
      <h2>TTS</h2>
      <SubnavRouteLink name="tts">Chat and TTS</SubnavRouteLink>
    </Box>
  );
};
