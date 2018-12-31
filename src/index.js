import { useState } from 'react';
import validate from 'validate.js';

export default (defaultValue, constraints = {}, validateImmediately = false) => {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState(validateImmediately);
  const validationMessage = validate.single(value, constraints);
  const setValueAndTouch = (newValue) => {
    setTouched(true);
    setValue(newValue);
  };

  return [
    value,
    setValueAndTouch,
    touched ? validationMessage === undefined : undefined,
    validationMessage,
    (touchValue = true) => setTouched(touchValue)
  ];
};
