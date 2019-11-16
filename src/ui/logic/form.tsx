import * as React from "react";
import { useStore } from "effector-react";
import { Store, Event } from "effector";

import { Input } from "../atoms/Input";
import { Field } from "../moleculas/Field";

type Props<T> = {
  label: string;
  isRequired?: boolean;
  store: Store<T>;
  onChange: Event<T>;
  view: Function;
};

export function createInputField<T>({
  label,
  isRequired,
  store,
  onChange,
  view: View = Input
}: Props<T>) {
  return () => {
    const value = useStore(store);

    return (
      <Field label={label} isRequired={isRequired}>
        <View value={value} onChange={onChange} />
      </Field>
    );
  };
}
