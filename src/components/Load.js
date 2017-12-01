import React from 'react'
import PropTypes from 'prop-types'

const Load = props => {
  const { isLocalLoading } = props
  return (
    <div className={isLocalLoading ? 'loading--local' : 'loading'}>
      <p className="loading__txt">
        <span className="loading__animation" />
      </p>
    </div>
  )
}

Load.defaultProps = {
  isLocalLoading: false
}

Load.protoType = {
  isLocalLoading: PropTypes.bool
}

export default Load
