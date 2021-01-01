import { useEffect, useState } from 'react';

const useUser = (userId) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserApi(userId).then(data => setUser(data))
  }, [userId]);

  return user;
}

export default useUser;

const USER1 = { name: 'mike', age: 23 };
const USER2 = { name: 'jane', age: 31 };

const getUserApi = (userId) => {
  return new Promise(res => {
    setTimeout(() => {
      res(userId % 2 ? USER1 : USER2);
    }, 500);
  });
}