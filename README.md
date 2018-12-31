# react-use-validated-state

React hook for using state with validation.  Uses [validate.js](https://validatejs.org/)

----

### TODO:

- Allow custom validation callback?
- Uses [`validate.single`](https://validatejs.org/#validate-single) - is this sufficient?

----

## Syntax

```javascript
const [state, setState, isValid, validationMessage, validate] =
       useValidatedState(initialState, validationConstraints, validateImmediately]);
```
Returns a stateful value, a function to update it, whether it's valid, and validation message (if invalid).


### Parameters

`initialState`
The initial state value.  During the initial render, the returned state is the same as this value.

`validationConstraints`
Optional.  Accepts a constraints object, please see [validate.js documentation](https://validatejs.org/#validate-single)

Default value:
`{}`

`validateImmediately`
Optional.  Boolean value whether to validate on initial render, otherwise will validate after first change.

Default value:
`false`

### Return values

`state`
The current state value.

`setState`
Function used to update the state. It accepts a new state value and enqueues a re-render of the component.

`isValid`
A boolean value indicating if the state passes the validationConstraints.
Returns undefined if validation has not been been run. 

`validationMessage`
Optional.  A string describing the validation failures, if any.

`validate`
Optional.  Function used to trigger validation, even if state is unchanged.
Useful for validating an unchanged value on blur.

### Usage

```javascript
const [username, setUsername, usernameValid, usernameValidationMessage, validateUsername] =
       useValidatedState('', { presence: true, email: true });
const [pwd, setPwd, pwdValid, validatePwd] =
       useValidatedState(password, { presence: true, length: { minimum: 6 } });

return (
  <form>
    <div>
      <label>Username</label>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        onBlur={() => validateUsername()}
      />
      <div>{usernameMessage}</div>
    </div>
    <div>
      <label>Password</label>
      <input
        type="password"
        value={pwd}
        onChange={e => setPwd(e.target.value)}
        onBlur={() => validatePwd()}
      />
      <div>{pwdMessage}</div>
    </div>
    <input type="submit" disabled={usernameValid && pwdValid} value="Sign Up" />
  </form>
);
```
