import React from 'react'
import './../stylesheets/ticket.css'

function Ticket({ heading, brief, handleClick, id }) {
  return (
    <div className="ticket" onClick={() => handleClick(id)}>
      <h2 className='ticket__heading'>{heading}</h2>
      <div className="ticket__topic">
        <h3>Topic</h3>
        <p>problem is...</p>
      </div>
      <div className="ticket__brief">
        <h3>Brief</h3>
        <p>{brief}</p>
      </div>
    </div>
  );
}

export default Ticket