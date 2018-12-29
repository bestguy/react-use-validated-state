# react-use-validated-state

React hook for using state with validation

# Work in Progress

## TODOs

- Add unit tests when interface stabilizes
- isValid currently returns `true` for untouched values (to avoid showing error on new page loads).  Need to determine best approach

----

## Syntax

```javascript
const [state, setState, isValid, validationMessage] =
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

Optional.  Boolean value whether to validate on initial render, otherwise wil validate after first change.

Default value:
`false`

### Return values

`state`

The current state value.

`setState`

Function used to update the state. It accepts a new state value and enqueues a re-render of the component.

`isValid`
A boolean value indicating if the state passes the validationConstraints.  

`validationMessage`
A string describing the validation failures, if any.

### Usage

```javascript
const [username, setUsername, usernameValid, usernameValidationMessage] =
       useValidatedState('', { presence: true, email: true });
const [pwd, setPwd, pwdValid] =
       useValidatedState(password, { presence: true, length: { minimum: 6 } });

return (
  <form>
    <div>
      <label>Username</label>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <div>{usernameMessage}</div>
    </div>
    <div>
      <label>Password</label>
      <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
      <div>{pwdMessage}</div>
    </div>
    <input type="submit" disabled={usernameValid && pwdValid} value="Sign Up" />
  </form>
);
```
