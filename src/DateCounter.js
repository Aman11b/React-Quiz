import { useReducer } from "react";

const initialState = { count: 0, step: 1 };
function reducer(curState, action) {
  // return curState + action;
  // if (action.type === "inc") return curState + 1;
  // if (action.type === "dec") return curState - 1;
  // if (action.type === "setCount") return action.payload;

  // return { count: 0, step: 1 };
  console.log(curState, action);
  switch (action.type) {
    case "dec":
      return { ...curState, count: curState.count - curState.step };
    case "inc":
      return { ...curState, count: curState.count + curState.step };
    case "setCount":
      return { ...curState, count: action.payload };
    case "setStep":
      return { ...curState, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("unknown action");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);

  // const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

/**
 * useReducer hook
 * -> more advance and complex way to manager state
 * - useReducer hook works wth reducer function(pure function),that takes previous state so-called action as an argument and then return the next state
 */

/**
 * why userReducer
 * -> state management with useState is not enough in certain situations:
 * - when component have lot of state variables and state updates,spread across many event handlers all over the component
 * - multiple state update need to happen at the same time (as a reaction to same event like starting a game)
 * - updating one peice of state depends on one or multiple other peices of state
 */

/**
 * Managing state with useReducer
 * -> an alternative way of setting state,ideal for complex state and related peice of state
 * ```
 * const [state,dispatch]=useReducer(reducer,initialState);
 * ```
 * - store related piece of state in a state object
 * - userReducer needs reducer:function containing all logic to update state,Decouples state logic from component
 * - reducer: pure function(no side effects) that takes current state and actionb,and return the next state
 * ```
 * function reducer(curState, action) {
  switch (action.type) {
    case "dec":
      return { ...curState, count: curState.count - curState.step };
    case "inc":
      return { ...curState, count: curState.count + curState.step };
    case "setCount":
      return { ...curState, count: action.payload };
    case "setStep":
      return { ...curState, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("unknown action");
  }
}
 * ```
- action:object that describe how to update state(has action type and payload)
- dispatch:function to trigger state updates,by "sending"action from event handlers to the reducer(similar to setState)
 */

/**
 * how reducer update state
 * -> updating state in a component-> dispatch(action -type:"updateDay" payload=23)->reducer(tate action and current state and return)-> next state-> re-render
 > reducer is called reducer coz its just like arr.reduce(),reduces acuumulate("reduce") action over time
 */
