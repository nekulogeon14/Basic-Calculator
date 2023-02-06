import {
  ADD_DIGIT,
  CHOOSE_OPERATION,
  CLEAR,
  DELETE_DIGIT,
  EVALUATE,
} from "./calculatorTypes";

const initialState = {
  currentOperand: null,
  previousOperand: null,
  operation: null,
  overwrite: false,
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return "";

  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
};


export const calculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.payload,
          overwrite: false,
        };
      }
      if (action.payload === "0" && state.currentOperand === "0") return state;
      if (action.payload === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${action.payload}`,
      };
    case CLEAR:
      return { ...initialState };
    case CHOOSE_OPERATION:
      if (state.currentOperand === null && state.previousOperand === null)
        return state;
      if (state.currentOperand === null) {
        return {
          ...state,
          operation: action.payload,
        };
      }
      if (state.previousOperand === null) {
        return {
          ...state,
          operation: action.payload,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.payload,
        currentOperand: null,
      };
    case EVALUATE:
      if (
        state.operation === null ||
        state.currentOperand === null ||
        state.previousOperand === null
      )
        return state;

      return {
        ...state,
        previousOperand: null,
        operation: null,
        overwrite: true,
        currentOperand: evaluate(state),
      };
    case DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand === null) return state
      if (state.currentOperand.length === 1) {
        return {...state,currentOperand: null}
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0,-1)
      }
    default:
      return state;
  }
};

export default calculatorReducer;
