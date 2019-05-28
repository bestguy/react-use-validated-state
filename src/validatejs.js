import useValidatedState from './index';
import validate from 'validate.js';

export default (defaultValue, constraints = {}, validateImmediately = false) => {
  const isInvalid = value => validate.single(value, constraints);
  return useValidatedState(defaultValue, isInvalid, validateImmediately)
};
