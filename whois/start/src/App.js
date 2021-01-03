import React from 'react';
import Search from './search/container/Search';
import 'antd/dist/antd.css';
import { Route } from 'react-router-dom';
import User from './user/container/User';

export default function App() {
  return (
    <>
      <Route exact path="/" component={Search} />
      <Route path="/user/:name" component={User} />
    </>
  )
}
