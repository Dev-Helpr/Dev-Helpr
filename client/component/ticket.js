import React from 'react'
import './../stylesheets/ticket.css'

function Ticket({ heading, brief }) {
  return (
    <div className="ticket">
      <h2>{programLang}</h2>
      <div>
        <h3>Topic</h3>
        <p>problem is...</p>
        <p>brief</p>
      </div>
    </div>
  );
}

export default Ticket