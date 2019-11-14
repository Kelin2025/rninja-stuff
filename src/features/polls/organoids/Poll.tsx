import * as React from "react";

import { usePoll } from "~api/polls";
import { useStaticDate } from "~lib/hooks";

import { Card, Box, Countdown } from "~ui";

export const Poll = ({ id, controls: Controls }) => {
  const poll = usePoll(id);

  const now = useStaticDate();

  return (
    <Card>
      <Box flow="row" cols={["1fr"]}>
        <Box flow="column" justify="space-between">
          <h2>{poll.question}</h2>
          {Controls && <Controls data={poll} />}
        </Box>
        {+now < poll.expiresAt && (
          <div>
            Ends in:{" "}
            <Countdown
              startDate={+now}
              duration={(poll.expiresAt - +now) / 1000}
            />
          </div>
        )}
        <Box flow="row">
          {poll.answers.map((answer, idx) => (
            <div>
              <b>{answer}</b> - {poll.votes.filter(vote => vote === idx).length}
            </div>
          ))}
        </Box>
      </Box>
    </Card>
  );
};
