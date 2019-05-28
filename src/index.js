import { useState } from 'react';

export default (defaultValue, isInvalid = () => undefined, validateImmediately = false) => {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState(validateImmediately);
  const validationMessage = isInvalid(value);
  const setValueAndTouch = (newValue) => {
    setTouched(true);
    setValue(newValue);
  };

  return [
    value,
    setValueAndTouch,
    touched ? validationMessage === undefined : undefined,
    touched ? validationMessage : undefined,
    (touchValue = true) => setTouched(touchValue)
  ];
};
