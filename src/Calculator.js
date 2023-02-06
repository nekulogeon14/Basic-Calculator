import React from "react";
import { buttonList } from "./buttonList";

import { useSelector, useDispatch } from "react-redux";
import {
  calAddDigit,
  calChooseOperation,
  calClear,
  calEvaluate,
  calDeleteDigit,
} from "./redux/calculatorActions";
import "./styles.css";

const Calculator = () => {
  const { currentOperand, previousOperand, operation } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  });

  const formatOperand = (operand) => {
    if (operand == null) return;
    const [integer, decimal] = operand.split(".");
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
  };
  return (
    <div>
      <div className="calculator-title">
        <div>React Redux</div>
      </div>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>
        <button className="span-two" onClick={() => dispatch(calClear())}>
          C
        </button>
        <button onClick={() => dispatch(calDeleteDigit())}>X</button>
        {buttonList.map((btn, index) => {
          return (
            <button
              onClick={() =>
                dispatch(
                  btn?.type === "operation"
                    ? calChooseOperation(btn.btnLabel)
                    : calAddDigit(btn.btnLabel)
                )
              }
              key={`calc-${index}`}
              className={btn.btnClass}
            >
              {btn.btnLabel}
            </button>
          );
        })}
        <button className="span-two" onClick={() => dispatch(calEvaluate())}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
