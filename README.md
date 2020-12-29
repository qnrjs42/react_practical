## SPA 만들기

### SPA 조건
- JS에서 브라우저로 페이지 전환 요청 보낼 수 있음.
- 단, 브라우저는 서버로 요청 보내진 말아야 함.
- 브라우저의 뒤로 가기와 같은 사용자의 페이지 전환 요청을 JS에서 처리 가능.
- 이때도 브라우저는 서버로 요청 보내진 말아야 함.

위 조건을 만족 시켜주는 브라우저 API
- pushState, replaceState 함수
- popstate 이벤트

```js
// App.js
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
```

```js
// Rooms.js
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
```

<br/>

---

## CSS 작성 방법

### 일반 CSS
```
이름이 충돌할 수 있는 문제점.
```
<br/>

### css-module
```js
// Box.js
import Style from "./Box.module.css";

const Box = ({ size }) => {
  if (size === 'big') {
    return <div className={`${Style.box} ${Style.big}`}>Big Box</div>;
  } else {
    return <div className={`${Style.box} ${Style.small}`}>Small Box</div>;
  }

  // 또는
  const isBig = size === 'big';
  return (
    <button
      className={cn(Style.Button, {
        [Style.big]: isBig,
        [Style.small]: !isBig,
      })}
    >
      {isBig ? "Big Button" : "Small Button"}
    </button>
  );
}
```
```css
/* Box.module.css */
.big {
  width: 200px;
}
.small {
  width: 100px;
}
.box {
  height: 50px;
  background-color: #aaaaaa;
}
```
<br/>

### Sass
```js
npm install node-sass@4.14.1

// Box.js
import Style from "./Box.module.scss";

// Box.module.scss
@import './shard.scss';

.big {
  width: 200px;
}
.small {
  width: 100px;
}
.box {
  height: 50px;
  background-color: $infoColor;
}

// shard.scss
$infoColor: #aaaaaa;
```

<br/>

### css-in-js
```js
npm i styled-components

const BoxCommon = styled.button`
  width: ${props => (props.isBig ? 100 : 50)}px;
  height: 30px;
  background-color: red;
`;

const Button = ({ size }) => {
  const isBig = size === 'big';
  const label = isBig ? '큰 버튼' : '작은 버튼';
  return <BoxCommon isBig={isBig}>{label}</BoxCommon>
};
```

<br/>

---

## 바벨 사용해보기

```
npm i @babel/core @babel/cli @babel/preset-react

npx babel --watch src --out-dir . --presets @babel/preset-react
```

--watch: 파일이 변경될 때마다 실행
src: src 폴더내에 있는 파일들을
--out-dir .: 현재 폴더로 변환
--presets @babel/preset-react: jsx로 된 파일들을 브라우저에서 돌아갈 수 있게 함.

---

## HTTPS

```
// mac
HTTPS=true npm start
```

```
// windows
set HTTPS=true && npm start
```