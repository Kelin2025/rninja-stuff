import * as React from "react";

export const ClickableLink = ({ children, className, onClick }) => {
  const handleClick = React.useCallback(
    e => {
      e.preventDefault();
      if (onClick) {
        onClick();
      }
    },
    [onClick]
  );

  return (
    <a href="#!" className={className} onClick={handleClick}>
      {children}
    </a>
  );
};
