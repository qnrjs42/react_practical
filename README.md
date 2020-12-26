## 바벨 사용해보기

```
npm i @babel/core @babel/cli @babel/preset-react

npx babel --watch src --out-dir . --presets @babel/preset-react
```

--watch: 파일이 변경될 때마다 실행
src: src 폴더내에 있는 파일들을
--out-dir .: 현재 폴더로 변환
--presets @babel/preset-react: jsx로 된 파일들을 브라우저에서 돌아갈 수 있게 함.