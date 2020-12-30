import React from "react";

const Title = ({ title }) => {

  return (
    <div>
      {title}
    </div>
  );
};

export default React.memo(Title);
