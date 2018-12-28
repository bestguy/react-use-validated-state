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
       useValidatedState(initialState, validationConstraints);
```
Returns a stateful value, a function to update it, whether it's valid, and validation message (if invalid).

During the initial render, the returned state (state) is the same as the value passed as the first argument (initialState).

The setState function is used to update the state. It accepts a new state value and enqueues a re-render of the component.

isValid is a boolean value indicating if the state passes the validationConstraints.  validationConstraints is a [validate.js](https://validatejs.org/) [constraints object](https://validatejs.org/#validate-single)

validationMessage is a string describing the validation failures, if any.

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
