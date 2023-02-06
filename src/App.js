import { Provider } from "react-redux";
import store from "./redux/store";
import Calculator from "./Calculator";
import CalculatorHooks from "./CalculatorHooks";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Calculator />
        <CalculatorHooks />
      </div>
    </Provider>
  );
}

export default App;
