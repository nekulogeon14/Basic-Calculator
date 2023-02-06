import { createStore } from "redux";

import calculatorReducer from "./calculatorReducers";

const store = createStore(calculatorReducer)

export default store