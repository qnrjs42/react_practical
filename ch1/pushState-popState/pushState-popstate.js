import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Home = () => {
  return <h2>여기는 홈페이지. 원하는 페이지 버튼을 클릭하라.</h2>;
};

const Page1 = () => {
  return <h2>여기는 Page1.</h2>;
};

const Page2 = () => {
  return <h2>여기는 Page2.</h2>;
};

const App = () => {
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    // 브라우저에서 페이지 전환 요청이 있을 때
    window.onpopstate = (event) => {
      // console.log(`location: ${document.location}, state: ${event.state}`);
      setPageName(event.state);
    };
  }, []);

  const onClick1 = () => {
    const pageName = "page1";
    window.history.pushState(pageName, "", "/page1");
    setPageName(pageName);
  };

  const onClick2 = () => {
    const pageName = "page2";
    window.history.pushState(pageName, "", "/page2");
    setPageName(pageName);
  };

  return (
    <>
      {/* 
      v1: 데이터를 의미하는 값 | state: ${event.state}
      "": 타이틀 | 중요하지 않음
       "/page1": URL
    */}
      <button onClick={onClick1}>page1</button>
      <button onClick={onClick2}>page2</button>
      {!pageName && <Home />}
      {pageName === "page1" && <Page1 />}
      {pageName === "page2" && <Page2 />}
    </>
  );
};

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById("root")
);