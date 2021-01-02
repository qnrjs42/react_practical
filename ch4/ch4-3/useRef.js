import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [age, setAge] = useState(20);
  const prevAgeRef = useRef(20);

  useEffect(() => {
    prevAgeRef.current = age;
  }, [age]);

  const prevAge = prevAgeRef.current;
  const text = age === prevAge ? "same" : age > prevAge ? "older" : "younger";

  return (
    <div>
      {`age: ${age} is ${text} than age ${prevAge}`}
      <button
        onClick={() => {
          const age = Math.floor(Math.random() * 50 + 1);
          setAge(age);
        }}
      >
        나이 변경
      </button>
    </div>
  );
};
export default App;
