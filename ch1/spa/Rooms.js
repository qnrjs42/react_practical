import { Link, Route } from "react-router-dom";

// App에서 Route 컴포넌트로 렌더링을 하면
// match라는 속성 값을 준다.
// match.url은 Route가 건네 준 /rooms
const Rooms = ({ match }) => {
  return (
    <>
      <h2>여기는 Rooms</h2>
      <Link to={`${match.url}/blueRoom`}>파란 방</Link>
      <br />
      <Link to={`${match.url}/greenRoom`}>초록 방</Link>
      <br />
      

      <Route exact path={`${match.url}/:roomId`} component={Room} />
      {/* 
        /rooms일 때만 렌더링하고
        /rooms/asdad 뒤에 붙으면 렌더링하지 않는다.
      */}
      <Route exact path={match.url} render={() => <h3>방을 선택하라.</h3>} />
      <br />
    </>
  );
}

const Room = ({ match }) => {
  // Route에서 건네 준 params의 roomId
  return <h2>{`${match.params.roomId} 방을 선택했다.`}</h2>
}

export default Rooms;