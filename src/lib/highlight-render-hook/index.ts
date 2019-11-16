import * as React from "react";

export const useIsRendered = (highlightTime, tokens = []) => {
  const [isRendered, setIsRendered] = React.useState(false);

  React.useEffect(() => {
    setIsRendered(true);
    setTimeout(setIsRendered, highlightTime, false);
  });

  return isRendered;
};

const memo = [];

useIsRendered.memo = (id, highlightTime, tokens = []) => {
  const [isRendered, setIsRendered] = React.useState(false);

  React.useEffect(() => {
    if (memo.includes(id)) {
      return;
    }
    memo.push(id);
    setIsRendered(true);
    setTimeout(setIsRendered, highlightTime, false);
  });

  return isRendered;
};
