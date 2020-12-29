import React from "react";
import styled from 'styled-components';

const BoxCommon = styled.div`
  height: 50px;
  background-color: yellow;
`;

const BoxBig = styled(BoxCommon)`
  width: 200px;
`;

const BoxSmall = styled(BoxCommon)`
  width: 100px;
`;

const Box = ({ size }) => {
  if (size === 'big') {
    return <BoxBig>Big Box</BoxBig>;
  } else {
    return <BoxSmall>Small Box</BoxSmall>;
  }
}

export default Box;