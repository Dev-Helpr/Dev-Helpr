import React from 'react'
import './../stylesheets/ticket.css'

function Ticket({ heading, brief, handleClick }) {
  return (
    <div className="ticket" onClick={handleClick}>
      <h3 className='ticket__programming_language__subject'>{heading}</h3>
      <h3 className='ticket__programming_language'>Programming Language:</h3>
      

      <div className="ticket__topic">
        <h3>Topic:</h3>
      <div className="ticket__topic__subject">
        <p>I can't seem to figure out how to write a for loop only using recursion...</p>
      </div>
      </div>

      <div className="ticket__brief">
        <h3>Brief:</h3>
        <div className="ticket__brief__subject">
        <p>{brief}My issue is, I am used to writing things in...</p>
      </div>
      </div>

    </div>
  );
}

export default Ticket