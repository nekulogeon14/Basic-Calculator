import {
  ADD_DIGIT,
  CHOOSE_OPERATION,
  CLEAR,
  DELETE_DIGIT,
  EVALUATE,
} from "./calculatorTypes";

export const calAddDigit = (digit) => {
  return {
    type: ADD_DIGIT,
    payload: digit,
  };
};
export const calChooseOperation = (operation) => {
  return {
    type: CHOOSE_OPERATION,
    payload: operation
  };
};
export const calClear = () => {
  return {
    type: CLEAR,
  };
};
export const calDeleteDigit = () => {
  return {
    type: DELETE_DIGIT,
  };
};
export const calEvaluate = () => {
  return {
    type: EVALUATE,
  };
};
