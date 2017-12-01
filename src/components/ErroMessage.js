import React from 'react'

const ErroMessage = props => {
    const {errorMsg} = props
    return(
        <div className="error">
            {errorMsg}
        </div>
    )
}

export default ErroMessage