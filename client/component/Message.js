import React from 'react'

function Message({ message, messenger}) {
  return (
        <div className='message'>
              <div >
                <p>{`${messenger}:`}</p>
              </div>
              <div>
                <h4>{message}</h4>
              </div>
        </div>
  )
}

export default Message
