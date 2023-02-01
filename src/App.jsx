import { useState } from "react";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
};

const Calculator = () => {
  const operators = ["*", "/", "+", "-"];
  const [expression, setExpression] = useState("");
  const [input, setInput] = useState("0");
  const [solved, setSolved] = useState(false);

  const handleClear = () => {
    setExpression("");
    setInput("0");
  };

  const handleOperator = (operator) => {
    let wcExp = expression;

    if (solved) {
      wcExp = input;
      setSolved(false);
    }

    if (operator !== "-") {
      wcExp = wcExp.replace(/[*\/+-]+$/, "");
    } else if (operator === "-" && wcExp.endsWith("-")) {
      return;
    }

    setExpression(wcExp + operator);
    setInput(operator);
  };

  const handleNumber = (digit) => {
    let wcExp = expression;
    let wcOutput = input;

    if (digit === "0" && wcExp === "0") {
      return;
    }

    if (solved) {
      wcExp = "";
      wcOutput = "";
      setSolved(false);
    }

    if (operators.includes(input)) {
      wcOutput = "";
    }

    if (wcOutput === "0") {
      wcOutput = "";
    }

    if (digit === ".") {
      if (wcOutput.includes(".")) {
        return;
      }

      if (wcOutput === "") {
        wcOutput = "0";
      }

      if (wcExp === "" || /[*\/+-]$/.test(wcExp)) {
        wcExp += "0";
      }
    }

    setExpression(wcExp + digit);
    setInput(wcOutput + digit);
  };

  const handleEquation = () => {
    let wcExp = expression;

    wcExp = wcExp.replace(/[*\/+-]+$/, "");

    const answer = (Math.round(eval(wcExp) * 1000000000000) / 1000000000000).toString();

    setExpression(wcExp + "=" + answer);
    setInput(answer);
    setSolved(true);
  };

  return (
    <div id="calculator">
      <div>
        <div id="exp">{expression}</div>
        <div id="display" className="output">
          {input}
        </div>
      </div>
      <div id="nums">
        <button id="clear" onClick={handleClear}>AC</button>
        <button className="func" id="divide" onClick={() => handleOperator("/")}>÷</button>
        <button className="func" id="multiply" onClick={() => handleOperator("*")}>×</button>
        <button id="seven" onClick={() => handleNumber("7")}>7</button>
        <button id="eight" onClick={() => handleNumber("8")}>8</button>
        <button id="nine" onClick={() => handleNumber("9")}>9</button>
        <button className="func" id="subtract" onClick={() => handleOperator("-")}>-</button>
        <button id="four" onClick={() => handleNumber("4")}>4</button>
        <button id="five" onClick={() => handleNumber("5")}>5</button>
        <button id="six" onClick={() => handleNumber("6")}>6</button>
        <button className="func" id="add" onClick={() => handleOperator("+")}>+</button>
        <button id="one" onClick={() => handleNumber("1")}>1</button>
        <button id="two" onClick={() => handleNumber("2")}>2</button>
        <button id="three" onClick={() => handleNumber("3")}>3</button>
        <button id="equals" onClick={handleEquation}>=</button>
        <button id="zero" onClick={() => handleNumber("0")}>0</button>
        <button id="decimal" onClick={() => handleNumber(".")}>.</button>
      </div>
    </div>
  );
};

export default App;
