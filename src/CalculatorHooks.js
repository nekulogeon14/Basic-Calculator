import React, { useEffect, useState } from "react";
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

const CalculatorHooks = () => {
  //   const { currentOperand, previousOperand, operation } = useSelector(
  //     (state) => state
  //   );
  const dispatch = useDispatch();
  const [currentOperand, setCurrentOperand] = useState(null);
  const [previousOperand, setPreviousOperand] = useState(null);
  const [operation, setOperation] = useState(null);
  const [evaluate, setEvaluate] = useState(false);
  const [evaluateUsingEqual, setEvaluateUsingEqual] = useState(false);
  const [overwrite, setOverwrite] = useState(false);

  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  });

  const formatOperand = (operand) => {
    if (operand == null) return;
    const [integer, decimal] = operand.split(".");
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
  };
  const handleClear = () => {
    setCurrentOperand(null);
    setPreviousOperand(null);
    setOperation(null);
  };

  const handleAddDigit = (digit) => {
    if (overwrite) {
      setOverwrite(false);
      setCurrentOperand(digit);
    } else {
      if (digit === "0" && currentOperand === "0") return;
      if (digit === "." && currentOperand.includes(".")) return;

      setCurrentOperand(`${currentOperand || ""}${digit}`);
    }
  };

  const handleChooseOperation = (operation) => {
    if (currentOperand === null && previousOperand === null) return;
    if (currentOperand === null) {
      setOperation(operation);
    } else {
      if (previousOperand === null) {
        setOperation(operation);
        setPreviousOperand(currentOperand);
        setCurrentOperand(null);
      } else {
        setOperation(operation);
        setEvaluate(true);
        setEvaluateUsingEqual(false);
      }
    }
  };

  const handleEvaluate = () => {
    setEvaluateUsingEqual(true);
    setEvaluate(true);
  };

  const handleDeleteDigit = () => {
    if (overwrite) {
      setOverwrite(false);
      setCurrentOperand(null);
    } else {
      if (currentOperand === null) return;
      if (currentOperand.length === 1) {
        setCurrentOperand(null);
      } else {
        setCurrentOperand(currentOperand.slice(0,-1))
      }
    }
  };

  useEffect(() => {
    if (evaluate && !evaluateUsingEqual) {
      setPreviousOperand(evaluateValue());
      setCurrentOperand(null);
      setEvaluate(false);
    } else {
      if (
        operation !== null &&
        previousOperand !== null &&
        currentOperand !== null
      ) {
        setOverwrite(true);
        setOperation(null);
        setPreviousOperand(null);
        setCurrentOperand(evaluateValue());
        setEvaluate(false);
      }
    }
  }, [evaluate, evaluateUsingEqual]);

  const evaluateValue = () => {
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
  return (
    <div>
      <div className="calculator-title">
        <div>React Hooks</div>
        <div>(useEffect + useState)</div>
      </div>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>
        <button className="span-two" onClick={() => handleClear()}>
          C
        </button>
        <button onClick={() => handleDeleteDigit()}>X</button>
        {buttonList.map((btn, index) => {
          return (
            <button
              onClick={() =>
                btn?.type === "operation"
                  ? handleChooseOperation(btn.btnLabel)
                  : handleAddDigit(btn.btnLabel)
              }
              key={`calc-${index}`}
              className={btn.btnClass}
            >
              {btn.btnLabel}
            </button>
          );
        })}
        <button className="span-two" onClick={() => handleEvaluate()}>
          =
        </button>
      </div>
    </div>
  );
};

export default CalculatorHooks;
