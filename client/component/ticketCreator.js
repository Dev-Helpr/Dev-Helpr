import React from "react";
import second from "./../stylesheets/ticketCreator.css";

function TicketCreator() {
  const handleSubmit = () => {
    
  }
  return (
    <div className="ticketCreator">
      <div className="ticketCreator__content">
        <form onSubmit={handleSubmit}></form>
      </div>
    </div>
  );
}

export default TicketCreator;
