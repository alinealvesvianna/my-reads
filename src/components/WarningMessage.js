import React from 'react'
import PropTypes from 'prop-types'

const WarningMessage = props => {
  const { warning, warningIsSuccess } = props
  return (
    <div
      className={
        warningIsSuccess ? 'warning warning__success' : 'warning warning__error'
      }
    >
      {warning}
    </div>
  )
}

WarningMessage.defaultProps = {
  warningIsSuccess: false
}

WarningMessage.protoType = {
  warning: PropTypes.object,
  warningIsSuccess: PropTypes.bool
}

export default WarningMessage
