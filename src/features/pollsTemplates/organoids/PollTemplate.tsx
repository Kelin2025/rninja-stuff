import * as React from "react";
import { usePollTemplate } from "~api/pollsTemplates";

export const PollTemplate = ({ id }) => {
  const poll = usePollTemplate(id);

  return (
    <div>
      <h1>{poll.question}</h1>
      <ul>
        {poll.answers.map(answer => (
          <li>{answer}</li>
        ))}
      </ul>
      <button onClick={console.log}>Start Poll</button>
      <button onClick={console.log}>Edit Poll</button>
    </div>
  );
};
