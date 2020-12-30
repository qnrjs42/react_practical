import { useState } from 'react';
import Title from './Title';

const Counter = () => {
  const [count, setCount] = useState({ value: 0 });

  const onClick = () => {
    setCount(count + 1);
  }
  
  return (
    <div>
      <Title title={`현재 카운트: ${count}`} />
      <button onClick={onClick}>증가</button>
    </div>
  );
};

export default Counter;
