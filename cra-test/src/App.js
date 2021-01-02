import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';


const App = () => {
  const profileRef = useRef();
  const onClick = () => {
    if(profileRef.current) {
      console.log('current name length:', profileRef.current.getNameLength());
      profileRef.current.addAge(5);
    }
  }

  return (
    <>
      <Profile ref={profileRef} />
      <button onClick={onClick}>add age 5</button>
    </>
  )
}
export default App;

const Profile = forwardRef((_, ref) => {
  const [name, setName] = useState('mike');
  const [age, setAge] = useState(0);

  // 두 번째 파라미터로 함수를 반환하는데
  // 반환 값이 부모의 ref 객체가 참조하는 값이 된다.
  useImperativeHandle(ref, () => ({
    addAge: (value) => setAge(age + value),
    getNameLength: () => name.length,
  }));

  return (
    <>
      <p>{`name is ${name}`}</p>
      <p>{`age is ${age}`}</p>
      {/* ... */}
    </>
  );
});