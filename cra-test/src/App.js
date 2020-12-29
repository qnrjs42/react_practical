import { BrowserRouter, Link, Route } from 'react-router-dom';
import Rooms from './Rooms';

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ padding: 20, border: "5px solid gray" }}>
        <Link to="/">홈</Link>
        <br />
        <Link to="/photo">사진</Link>
        <br />
        <Link to="/rooms">방 소개</Link>
        <br />
        {/*
          exact: exact가 없으면 / 경로에서 photo와 rooms가 같이 렌더링이 된다.
        */}
        <Route exact path="/" component={Home} />
        <Route path="/photo" component={Photo} />
        <Route path="/rooms" component={Rooms} />
      </div>
    </BrowserRouter>
  );
}

const Home = () => {
  return <h2>여기는 Home.</h2>;
};

export const Photo = () => {
  return <h2>여기는 Photo.</h2>;
};

export default App;