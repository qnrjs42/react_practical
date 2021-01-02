## useEffect mount가 한 번만 됐을 때 효과적인 로직

```jsx
// App.js
import React, { useState } from 'react';
import useOnMounted from './useOnMounted';


const App = () => {
  return (
    <>
      <Profile />
    </>
  )
}
export default App;

const Profile = ({ userId }) => {
  const [user, setUser] = useState();

  useOnMounted(() => fetchUser(userId).then((data) => setUser(data)));

  console.log(user);
}

const fetchUser = () => {};
```

```jsx
// useOnMounted.js
import { useEffect } from 'react';
const useOnMounted = (effect) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

export default useOnMounted;
```



---

## 조건부 렌더링

```jsx
// 방법 1
return (
	{isLogin ? (
     	<p>asda</p>
     	<p>asda</p>
	) : null}
)

// 방법 2 | 삼항 연산자 비해 가독성이 좋다.
return (
	{isLogin && (
     	<p>asda</p>
     	<p>asda</p>
	)}
)
```

```js
const v1 = 'ab' && 0 && 2; // 0
const v2 = "ab" && 2 && 3; // 3
const v3 = "ab" || 0; // 'ab'
const v4 = "" || 0 || 3; // 3
```

```jsx
<>
	{cash && <p>{cash}원 보유 중</p>}
	{!!cash && <p>{cash}원 보유 중</p>}
	{memo && <p>{200 - memo.length}자 입력 기능</p>}
</>
```

- 주의할 점: cash는 Number이기 때문에 0이 들어오면 거짓으로 판단 되어 0으로 렌더링 될 수 있다.
- 이럴 때는 명확하게 boolean 타입으로 변환해준다.
- `{!!cash && <p>{cash}원 보유 중</p>}` 
- memo가 빈 문자열로 들어오면 `{''}` 이렇게 렌더링이 된다.



---

## useLayoutEffect

- useEffect 훅과 비슷하게 동작하지만, 부수효과 함수를 동기로 호출함.
- 즉, 렌더링 결과가 돔에 반영된 직후에 바로 호출.
- 그렇기때문에 연산을 많이하면 브라우저가 먹통이 될 가능성이 높음.
- 특별한 이유가 없다면 useEffect 사용 권장.

---

## useImperativeHandle

- 클래스형 컴포넌트의 부모 컴포넌트는 ref 객체를 통해 자식 컴포넌트의 메서드를 호출할 수 있다.
- 함수형 컴포넌트에서도 멤버 변수나 멤버 함수가 있는 것처럼 만들 수 있음.

```jsx
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
```



---

## useMoeo

- 계산량이 많은 함수의 반환 값을  재활용하는 용도
- 

```jsx
import React, { useMemo, useState } from 'react';

const App = () => {
  const [v1, setV1] = useState(0);
  const [v2, setV2] = useState(0);
  const [v3, setV3] = useState(0);
  const value = useMemo(() => runExpensiveJob(v1, v2), [v1, v2]);

  return (
    <>
      {`value is ${value}`}
      <button
        onClick={() => {
          setV1(Math.random());
          setV2(Math.random());
        }}
      >v1/v2 수정</button><br/><br/>

      {`v3 is ${v3}`}
      <button onClick={() => setV3(Math.random())}>v3 수정</button>
    </>
  )
}
export default App;

const runExpensiveJob = (v1, v2) => {
  console.log('runExpensiveJob is Called');
  return v1 + v2;
}
```



---

## useRef

- 실제 돔 요소에 접근

```jsx
import React, { useEffect, useRef } from 'react';


const App = () => {
  const inputRef = useRef();

  useEffect(() => {
    // current 속성은 실제 돔 요소를 가리킴
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button>텍스트로 이동</button>
    </div>
  );
}
export default App;
```



```jsx
import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [age, setAge] = useState(20);
  const prevAgeRef = useRef(20);

  useEffect(() => {
    prevAgeRef.current = age;
  }, [age]);

  const prevAge = prevAgeRef.current;
  const text = age === prevAge ? "same" : age > prevAge ? "older" : "younger";

  return (
    <div>
      {`age: ${age} is ${text} than age ${prevAge}`}
      <button
        onClick={() => {
          const age = Math.floor(Math.random() * 50 + 1);
          setAge(age);
        }}
      >
        나이 변경
      </button>
    </div>
  );
};
export default App;
```

- useRef로 이전 값 기억하기

  

---

## context API

- 상위 컴포넌트에서 하위 컴포넌트로 데이터 전달할 떄 속성 값을 사용 함.
- 많은 수의 하위 컴포넌트로 전달할 때 속성 값을 전달하는 코드를 반복적으로 작성해야 함.
- 상위 컴포넌트 - 하위 컴포넌트와 멀리 떨어진 경우 중간에 있는 컴포넌트가 기계적으로 속성 값을 전달하는 코드를 작성해야 함.

```jsx
import React, { createContext, useState } from 'react';

// 1. 초기 값을 넣어서 호출하면 객체가 반환
// 그 객체 안에 Provider, Consumer 컴포넌트가 들어있음
const UserContext = createContext('unknown');

const App = () => {
  const [name, setName] = useState('mike');

  return (
    <div>
      {/* 
        2. Provider에서 value에 값을 넣어주면 Consumer에서 그 값을 받아서 처리
      */}
      <UserContext.Provider value={name}>
        <div>
          상단 메뉴
        </div>
        <Profile />
        <div>하단 메뉴</div>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </UserContext.Provider>
    </div>
  );
}
export default App;

const Profile = React.memo(() => {
  console.log('Profile');
  return (
    <>
      <Greeting />
    </>
  );
});

const Greeting = () => {
  return (
    // 3. Consumer는 가장 가까운 Provider를 찾아서 value를 사용
    // 4. root까지 가도 Provider를 찾지 못하면 초기 값을 사용
    <UserContext.Consumer>
      {username => <p>{`${username}님 안녕하세요.`}</p>}
    </UserContext.Consumer>
  )
}
```

```jsx
const Greeting = () => {
  const username = useContext(UserContext);
  return (
    <>
      {<p>{`${username}님 안녕하세요.`}</p>}
    </>
  );
}
```

- UserContext.Consumer 대신에 useContext 훅으로 사용하면 가독성이 좋아진다.



### context 단점

```jsx
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
```

- `value={{ username, age }}` 이런식으로 입력하게 되면 App 컴포넌트가 렌더링 될 때마다 새로운 객체가 만들어짐. `value={{ username, age }}` 값이 변경 되지 않아도 불필요한 렌더링이 될 수 있음.



---

## jsonconfig.json

```json
// jsonconfig.json
// 타입체크, auto import
{
  "compilerOptions": {
    "jsx": "react",
    "module": "commonjs",
    "target": "es6",
    "checkJs": true
  },
  "exclude": ["node_modules"]
}
```



---

## 훅 사용 시 지켜야 할 규칙

- 하나의 컴포넌트에서 훅을 호출하는 순서는 항상 같아야 한다.
- 훅은 함수형 컴포넌트 또는 커스텀 훅 안에서만 호출되어야 한다.
- 클래스형 컴포넌트 메서드 뿐만 아니라 일반 함수에서도  사용할 수 없다.
- if문 안에서 훅 사용할 수 없다.
- for문 안에서 훅 사용할 수 없다.
- 일반 함수 안에서 훅 사용할 수 없다.

---

## 커스텀 훅

```jsx
import useUser from "./useUser";

const Profile = ({ userId }) => {
  const user = useUser(userId);

  return (<div>
    {!user && <p>사용자 정보를 가져오는 중...</p>}
    {user && (
      <>
        <p>{`name is ${user.name}`}</p>
        <p>{`age is ${user.age}`}</p>
      </>
    )}
  </div>)
};

export default Profile;
```

```jsx
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
```

- 위의 코드는 userId가 변경될 때마다 훅 내부(useUser)에서 자동으로 api를 호출해 사용자 데이터를 가져옴
- 훅 내부(useUser) 상태 값(user)가 변경되면 자동으로 Profile 컴포넌트도 같이 새로운 유저와 함께 렌더링 됨.

```jsx
// 마운트 여부 확인 훅
import { useEffect, useState } from "react";

export default function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
```





---

## 여러 개의 상태 값 useState({ name, age, ... });

```jsx
const [state, setState] = useState({ name: '', age: 0 });

...
setState({
    ...state,
    name: e.target.value
});
```

여러 개의 상태 값을 관리할 때는 useState보다 useReducer 훅이 더 적합.



---

## 상태 값 변경 함수

ex) setCount(count + 1);

비동기이면서 batch(일괄) 처리하기 때문에

```jsx
const onClick = () => {
	setCount(count + 1);
	setCount(count + 1);
}
```

리액트는 효율적으로 렌더링 하기 위해 위의 코드는 count가 1밖에 증가하지 않는다.

만약 리액트가 상태 값 변경 함수를 동기 처리한다면 하나의 상태 값 변경 함수가 호출 될 때마다

화면을 다시 그리기 때문에 성능 이슈가 생길 수 있음.

```jsx
const onClick = () => {
	setCount(count => count + 1);
	setCount(count => count + 1);
}
```

만약 꼭 사용한다면 위와 같이 함수를 입력하면 된다.



```jsx
// 외부에서 이벤트 핸들러 등록해서 사용할 경우 batch 처리가 되지 않는다.
useEffect(() => {
	window.addEventListenr('click', onClick);
    return () => window.removeEventListener('click', onClick);
});
console.log('render called');
```



```jsx

const onClick = () => {
	ReactDOM.unstable_batchedUpdates(() => {
        setCount(count => count + 1);
    	setCount(count => count + 1);
    });
}
useEffect(() => {
	window.addEventListenr('click', onClick);
    return () => window.removeEventListener('click', onClick);
});
console.log('render called');
```

- 외부에서도 이벤트 핸들러를 batch 처리 하기 위해서 ReactDOM.unstable_batchedUpdates()을 사용한다.

concurrent mode로 동작할 미래 리액트는 외부에서 관리되는 이벤트 처리 함수도 batch로 처리될 예정.

---

가상 돔: 렌더 단계

실제 돔: 커밋 단계

리액트는 렌더링할 때마다 가상 돔을 만들어 이전 가상 돔과 비교함.

---

컴포넌트가 추가 되는 현상: mount

컴포넌트가 삭제 되는 현상: unmount

---

## RactDOM.createPortal

```html
// public.index.html
<div id="root"></div> // 기존 root
<div id="something"></div> // 새로 추가한 something
```

```jsx
// App.js
import ReactDOM from 'react-dom';

<>
	{ReactDOM.createPortal(
    	<>
        	<p>안녕하세요</p>
        	<p>실전 리액트 프로그래밍</p>
        </>,
        docuement.getElementById('somthing'),
    )}
</>
```



---

## key

- 렌더링을 효율적으로 하기 위해 필요한 값
- 이 값을 이용해 virtual dom에서 연산을 효율적으로 할 수 있음
- key가 바뀌면 기존 돔 요소를 삭제했다가 다시 생성

```jsx
import { useEffect, useState } from "react";

const App = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setSeconds(v => v+1);
    }, 1000);
  });

  return (
    <div key={seconds}>
     <h1 style={{color: seconds %2 ? 'red' : 'blue'}}>안뇽하세요</h1> 
     <h2>지금까지 {seconds}초가 지났습니다.</h2>
    </div>
      
      
      // key를 컴포넌트에 줄 경우 key 값이 변경되어 컴포넌트를 삭제했다가 새로 추가하여
      // 카운트는 계속 0이 된다.
     <div>
      <Counter key={seconds} />
      {seconds % 2 === 0 && <Counter />} // 초가 짝수 일 때만 렌더링
     <h1 style={{color: seconds %2 ? 'red' : 'blue'}}>안뇽하세요</h1> 
     <h2>지금까지 {seconds}초가 지났습니다.</h2>
    </div>
  );
}

export default App;
```

```jsx
// 버튼 클릭하면 카운트가 증가하는 컴포넌트
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(count + 1);
  }
  
  return (
    <>
      <p>{`현재 카운트: ${count}`}</p>
      <button onClick={onClick}>증가</button>
    </>
  )
}

export default Counter;
```



---



## 컴포넌트 상태 값

- 특정 값이 바뀌지 않아도 렌더링이 되는 경우를 방지
- 같은 컴포넌트라도 각각의 상태 값이 존재

```
React.memo()
```



<br/>

---

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