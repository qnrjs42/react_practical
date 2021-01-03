import { Button, Input, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state";

const Department = () => {
  const dispatch = useDispatch();
  const [isEditDepartment, setIsEditDepartment] = useState(false);
  const [tempDepartment, setTempDepartment] = useState('');
  const user = useSelector(state => state.user.user);

  const onSaveDepartment = () => {
    if(tempDepartment) {
      dispatch(actions.fetchUpdateUser({ user, key: 'department', value: tempDepartment, fetchKey: 'depoartment' }));
      setIsEditDepartment(false);
    } else {
      message.error('소속은 필수 입니다.');
    }
  }

  const onEditDepartment = () => {
    setIsEditDepartment(true);
    setTempDepartment(user.department);
  }
  
  return (
    <>
      {isEditDepartment && (
        <Input
          autoFocus
          value={tempDepartment}
          onChange={(e) => setTempDepartment(e.target.value)}
          onPressEnter={onSaveDepartment}
          onBlur={() => setIsEditDepartment(false)}
          style={{ width: "100%" }}
        />
      )}
      {!isEditDepartment && (
        <Button
          type="text"
          block
          onClick={onEditDepartment}
          style={{ textAlign: "left", padding: 0 }}
        >
          {user.department}
        </Button>
      )}
    </>
  );
};

export default Department;
