import React from 'react'

const Message = props => {
    const {message} = props
    return(
        <div className="error">
            {message}
        </div>
    )
}

export default Message