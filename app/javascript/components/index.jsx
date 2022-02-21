import React, { useState } from "react";

export default function Counter_component() {
  const [count, setCount] = useState(0);

  let incrementCount = () => {
    setCount(count + 1);
  };

  let decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <div className="app">
      <h3>Count:</h3>
      <h1>{count}</h1>
      <button onClick={decrementCount}>decrement</button> 
      <button onClick={incrementCount}>increment</button> 
    </div>
  );
}
