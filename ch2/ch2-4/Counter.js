import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(count + 1);
  }
  
  return (
    <>
      <p>{`현재 카운트: ${count}`}</p>
      <button onClick={onClick}>증가</button>
    </>
  )
}

export default Counter;