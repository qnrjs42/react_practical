import { useEffect, useState } from "react";
import Counter from "./Counter";

const App = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setSeconds(v => v+1);
    }, 1000);
  });

  return (
    <div>
      <Counter key={seconds} />
      {seconds % 2 === 0 && <Counter />}
     <h1 style={{color: seconds %2 ? 'red' : 'blue'}}>안뇽하세요</h1> 
     <h2>지금까지 {seconds}초가 지났습니다.</h2>
    </div>
  );
}

export default App;