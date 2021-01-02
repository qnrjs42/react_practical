import React, { createContext, useContext, useState } from "react";

// 1. 초기 값을 넣어서 호출하면 객체가 반환
// 그 객체 안에 Provider, Consumer 컴포넌트가 들어있음
const UserContext = createContext("unknown");

const App = () => {
  const [name, setName] = useState("mike");

  return (
    <div>
      {/* 
        2. Provider에서 value에 값을 넣어주면 Consumer에서 그 값을 받아서 처리
      */}
      <UserContext.Provider value={name}>
        <div>상단 메뉴</div>
        <Profile />
        <div>하단 메뉴</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </UserContext.Provider>
    </div>
  );
};
export default App;

const Profile = React.memo(() => {
  console.log("Profile");
  return (
    <>
      <Greeting />
    </>
  );
});

const Greeting = () => {
  const username = useContext(UserContext);
  return <>{<p>{`${username}님 안녕하세요.`}</p>}</>;
};
