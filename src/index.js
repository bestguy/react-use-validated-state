import { useState } from 'react';
import validate from 'validate.js';

export default (defaultValue, constraints = { presence: true }) => {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState(false);

  const setValueAndTouch = (newValue) => {
    setTouched(true);
    setValue(newValue);
  };

  const validationMessage = validate.single(value, constraints);
  return [
    value,
    setValueAndTouch,
    !touched || validationMessage === undefined,
    validationMessage
  ];
};
