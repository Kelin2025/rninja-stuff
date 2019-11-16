import * as React from "react";
import styled from "styled-components";

const InputView = ({
  value,
  onChange,
  className,
  autoFocus,
  multiline,
  ...props
}) => {
  const Tag = multiline ? "textarea" : "input";
  const inputRef = React.useRef(null);
  const handleChange = React.useCallback(
    evt => {
      onChange(evt.target.value);
    },
    [onChange]
  );

  React.useEffect(() => {
    if (inputRef.current) {
      if (autoFocus) {
        inputRef.current.focus();
      }
    }
  }, [inputRef.current]);

  return (
    <Tag
      ref={inputRef}
      value={value}
      onChange={handleChange}
      className={className}
      {...props}
    />
  );
};

export const Input = styled(InputView)`
  background: #2f2f2f;
  border: 0;
  border-radius: 5px;
  box-sizing: border-box;
  color: inherit;
  display: block;
  font: inherit;
  outline: none;
  font-size: 16px;
  height: 46px;
  line-height: 20px;
  width: 100%;
  padding: 10px 20px;

  &textarea {
    resize: vertical;
  }
`;
