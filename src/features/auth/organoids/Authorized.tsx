import * as React from "react";
import { useStore } from "effector-react";

import { $isAuthChecked, $isAuthorized } from "~api/auth";

export const Authorized = ({ children }) => {
  const isAuthChecked = useStore($isAuthChecked);
  const isAuthorized = useStore($isAuthorized);

  if (!isAuthorized || !isAuthChecked) {
    return null;
  }

  return children;
};
