import React, { useEffect, useState } from 'react';

const App = () => {
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    setTimeout(() => setFlag(prev => !prev), 1000);
  })
  if(flag) {
    return (
      <>
        <p key="apple">사과</p>
        <p key="banana">바나나</p>
      </>
    );
  } else {
    return (
      <>
        <p key="apple">사과</p>
        <p key="pineapple">파인애플</p>
        <p key="banana">바나나</p>
      </>
    );
  }
}
export default App;
