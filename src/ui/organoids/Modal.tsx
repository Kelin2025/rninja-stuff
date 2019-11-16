import * as React from "react";
import styled from "styled-components";
import { useStoreMap } from "effector-react";
import { animated, useSpring } from "react-spring";

import { modalEasing } from "../logic/animation";

import { $isModalOpened, closeModal, $isModalAnimating } from "../logic/modals";

const ModalRoot = styled(animated.div)`
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

export const Modal = ({ name, view: View, viewProps, children, className }) => {
  const isModalAnimating = useStoreMap({
    store: $isModalAnimating,
    keys: [name],
    fn: (isOpened, [name]) => isOpened[name] || false
  });
  const isModalOpened = useStoreMap({
    store: $isModalOpened,
    keys: [name],
    fn: (isOpened, [name]) => isOpened[name] || false
  });
  const shouldBeDisplayed = isModalOpened || isModalAnimating;
  const spring = useSpring({
    opacity: isModalOpened ? 1 : 0,
    config: modalEasing
  });
  const handleClickOutside = React.useCallback(
    evt => {
      if (evt.target === evt.currentTarget) {
        closeModal(name);
      }
    },
    [name]
  );

  return (
    shouldBeDisplayed && (
      <ModalRoot
        style={spring}
        className={className}
        onClick={handleClickOutside}
      >
        <View {...viewProps} className={className}>
          {children}
        </View>
      </ModalRoot>
    )
  );
};
