
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