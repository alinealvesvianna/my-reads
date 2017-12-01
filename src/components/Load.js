import React from 'react';
import PropTypes from "prop-types";

const Load = props => {
  const { isLocalLoading } = props
  return (
    <div className={isLocalLoading ? "loading--local" : "loading"}>
      CARREGANDO
    </div>
  );
}

Load.defaultProps = {
  isLocalLoading: false
};

Load.protoType = {
  isLocalLoading: PropTypes.bool
};

export default Load;
