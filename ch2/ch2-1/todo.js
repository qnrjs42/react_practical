import { useState } from "react";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [currentId, setCurrentId] = useState(1);
  const [desc, setDesc] = useState("");
  const [showOdd, setShowOdd] = useState(false);

  const onAdd = () => {
    const todo = { id: currentId, desc };
    setCurrentId(currentId);
    setTodoList([...todoList, todo]);
  };

  const onDelete = (e) => {
    const id = Number(e.target.dataset.id);
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  const onSaveToServer = () => {};

  return (
    <>
      <h3>할 일 목록</h3>
      <ul>
        {todoList
          .filter((_, index) => (showOdd ? index % 2 === 0 : true))
          .map((todo) => (
            <li key={todo.id}>
              <span>{todo.desc}</span>
              <button data-id={todo.id} onClick={onDelete}>
                삭제
              </button>
            </li>
          ))}
      </ul>
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={onAdd}>추가</button>
      <button onClick={() => setShowOdd(!showOdd)}>홀수 On/Off</button>
      <button onClick={onSaveToServer}>서버에 저장</button>
    </>
  );
};

export default App;
