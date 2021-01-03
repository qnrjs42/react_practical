import { Button, Dropdown, Menu } from "antd";
import { SettingFilled } from '@ant-design/icons';
import React from "react";

/**
 * 
 * @param {object} param
 * @param {() => void} param.logout
 */

const Settings = ({ logout }) => {
  return (
    <>
      <Dropdown 
        overlay={
          <Menu>
            <Menu.Item onClick={logout}>로그아웃</Menu.Item>
          </Menu>
        } trigger={['click']}
        placement="bottomRight"
      >
        <Button shape="circle" icon={<SettingFilled />} />
      </Dropdown>
    </>
  );
};

export default Settings;
