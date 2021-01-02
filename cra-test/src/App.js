import React, { forwardRef, useEffect, useRef } from 'react';


const App = () => {
  const inputRef = useRef();

  useEffect(() => {
    // current 속성은 실제 돔 요소를 가리킴
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input type="text" ref={inputRef} />
      {/* 
        일반 컴포넌트에도 ref를 사용할 수 있음
        Box가 클래스형 컴포넌트라면 해당 컴포넌트의 인스턴스를 가리킴
      */}
      {/* <Box ref={inputRef} /> */}
      <Button ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>
    </div>
  );
}
export default App;

const Box = ({ inputRef }) => {
  return (
    <>
      <input type="text" ref={inputRef} />
      <button>저장</button>
    </>
  )
}
const Button = React.forwardRef(() => ({ onClick }, ref) => {
  return (
    <>
      <button onClick={onClick} ref={ref}>저장</button>
    </>
  );
});