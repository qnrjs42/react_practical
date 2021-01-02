import React, { createContext, useContext, useState } from "react";

const UserContext = createContext("unknown");
const ThemeContext = createContext("drak");

const App = () => {
  const [name, setName] = useState("mike");

  return (
    <div>
      <ThemeContext.Provider value="drak">
        <UserContext.Provider value={name}>
          <div>상단 메뉴</div>
          <Profile />
          <div>하단 메뉴</div>
        </UserContext.Provider>
      </ThemeContext.Provider>
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
  const theme = useContext(ThemeContext);
  return (
    <>
      {
        <p style={{ color: theme === "drak" ? "gray" : "green" }}>
          {`${username}님 안녕하세요.`}
        </p>
      }
    </>
  );
};
