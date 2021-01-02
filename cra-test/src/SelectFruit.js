import React, { useState } from "react";

const SelectFruit = () => {
  const [fruits, setFruits] = useState(["apple", "banana", "orange"]);
  const [newFruit, setNewFruit] = useState("");

  const addNewFruit = () => {
    setFruits([...fruits, newFruit]);
    setNewFruit("");
  };

  return (
    <>
      <Select options={fruits} />
      <input
        type="text"
        value={newFruit}
        onChange={(e) => setNewFruit(e.target.value)}
      />
      <button onClick={addNewFruit}>추가하기</button>
    </>
  );
};

export default SelectFruit;

const Select = React.memo(({ options }) => (
  <div>
    {options.map((item, index) => (
      <p key={index}>{item}</p>
    ))}
  </div>
));
