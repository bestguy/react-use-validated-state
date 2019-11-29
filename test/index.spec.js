import React from 'react';
import { render, cleanup, fireEvent, getByTestId, queryByTestId } from '@testing-library/react';
import useValidatedState from '../src/index';

afterEach(cleanup);

function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return (email && regex.test(email)) ? undefined : 'is not a valid email';
}

const SimpleWrapper = () => {
  const [value, setValue] = useValidatedState('oogah');
  return <button onClick={() => setValue('chakah')}>{value}</button>;
}

const ValidationWrapper = ({ email, validate = false }) => {
  const [value, setValue, isValid, validationMessage] = useValidatedState(email, validateEmail, validate);
  return (
    <>
      <input value={value || ''} onChange={e => setValue(e.target.value)} />
      {(isValid === false) && <div data-testid="msg">{validationMessage}</div>}
    </>
  );
}

test('useValidatedState should return specified state value', () => {
  const { container } = render(<SimpleWrapper />);
  const button = container.firstChild;
  expect(button.textContent).toBe('oogah');
});

test('useValidatedState should allow updating the state value', () => {
  const { container } = render(<SimpleWrapper />);
  const button = container.firstChild;
  fireEvent.click(button);
  expect(button.textContent).toBe('chakah');
});

test('useValidatedState should validate specified value', () => {
  const { container } = render(<ValidationWrapper email="arsars@" />);
  const input = container.firstChild;
  expect(input.value).toBe('arsars@');
});

test('useValidatedState should skip validation on initial state', () => {
  const { container } = render(<ValidationWrapper />)
  const wrapper = <ValidationWrapper email="badValue" />
  render(wrapper);
  expect(queryByTestId(container, 'msg')).toBeNull();
});

test('useValidatedState should validate on initial state if specified', () => {
  const { container } = render(<ValidationWrapper email="badValue" validate />);
  const msg = getByTestId(container, 'msg');
  expect(msg.textContent).toBe('is not a valid email');
});

test('useValidatedState should validate on state change', () => {
  const wrapper = <ValidationWrapper email="a@b.com"/>;
  const { container, rerender } = render(wrapper)
  expect(queryByTestId(container, 'msg')).toBeNull();

  const input = container.firstChild;
  fireEvent.change(input, { target: { value: 'xxxxx' } });
  rerender(wrapper);

  const msg = getByTestId(container, 'msg');
  expect(msg.textContent).toBe('is not a valid email');
});


