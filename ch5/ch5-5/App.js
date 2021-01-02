import React, { useState } from "react";
import useOnMounted from "./useOnMounted";

const App = () => {
  return (
    <>
      <Profile />
    </>
  );
};
export default App;

const Profile = ({ userId }) => {
  const [user, setUser] = useState();

  useOnMounted(() => fetchUser(userId).then((data) => setUser(data)));

  console.log(user);
};

const fetchUser = () => {};
