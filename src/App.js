import React, { useReducer } from "react";
import EightBall from "./components/eightball";
import { StateProvider } from "./context";
import "./App.css";

function App() {
  const initialState = {
    queries: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return {
          queries: [
            ...state.queries,
            { query: action.addQuery, reply: action.addReply, id: action.addId }
          ]
        };
      default:
        return state;
    }
  };

  return (
    <div className="App">
      <StateProvider value={useReducer(reducer, initialState)}>
        <EightBall />
      </StateProvider>
    </div>
  );
}

export default App;
