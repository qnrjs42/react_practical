import React, { createContext, useContext, useState } from 'react';

// const UserContext = createContext({ username: 'unknown', helloCount: 0 });
const SetUserContext = createContext(() => {});

const UserContext = createContext({ username: "unknown", age: 0 });

const App = () => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);

  return (
    <div>
      <UserContext.Provider value={{ username, age }}>
        <Profile />
      </UserContext.Provider>
    </div>
  );
}
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
 const setUser = useContext(SetUserContext);
 const { username, helloCount } = useContext(UserContext);

 return (
   <>
    <p>{`${username}님 하이요`}</p>
    <p>{`인사 횟수: ${helloCount}`}</p>
    <button onClick={() => setUser({ username, helloCount: helloCount + 1})}>
      인사하기
    </button>
   </>
 )
};