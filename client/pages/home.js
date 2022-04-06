import React, { useState } from "react";
import Ticket from "./../component/ticket.js";
import TicketDescription from "./../component/ticketDescription.js";
import TicketCreator from "./../component/ticketCreator.js";
import "./../stylesheets/home.css";

function Home() {
  const [ticketIsClick, setTicketIsClick] = useState(false);
  const [createTicketIsClick, setCreateTicketIsClick] = useState(false);

  const handleClick = () => setTicketIsClick(true);

  const createTicketOnClick = () => setCreateTicketIsClick(prev => !prev);
  return (
    <div className="home">
      <div className="home__tickets">
        <Ticket heading="Javascript" brief="wdd" handleClick={handleClick} />
        <Ticket heading="C++" brief="wdd" handleClick={handleClick} />
        <Ticket heading="Java" brief="wdd" handleClick={handleClick} />
        <Ticket heading="Python" brief="wdd" handleClick={handleClick} />
        <Ticket heading="Python" brief="wdd" handleClick={handleClick} />
        <Ticket heading="Python" brief="wdd" handleClick={handleClick} />
        <Ticket heading="Python" brief="wdd" handleClick={handleClick} />
        <Ticket heading="Python" brief="wdd" handleClick={handleClick} />
        <Ticket heading="Python" brief="wdd" handleClick={handleClick} />
        <Ticket heading="Python" brief="wdd" handleClick={handleClick} />
        <Ticket heading="Python" brief="wdd" handleClick={handleClick} />
        <Ticket heading="Python" brief="wdd" handleClick={handleClick} />
        <Ticket heading="Python" brief="wdd" handleClick={handleClick} />
      </div>
      {ticketIsClick ? (
        <TicketDescription />
      ) : (
        <div className="ticketDescription">hi</div>
      )}
      <button onClick={createTicketOnClick}>+Create Ticket</button>
      {createTicketIsClick ? <TicketCreator /> : null}
    </div>
  );
}

export default Home;
