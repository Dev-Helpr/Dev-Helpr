import React, { useState } from "react";
import Ticket from "../components/ticket.js";
import TicketDescription from "../components/ticketDescription.js";
import TicketCreator from "../components/ticketCreator.js";
import "../stylesheets/home.css";
import Chatbox from "../components/Chatbox.jsx";

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
      <Chatbox/>
    </div>
  );
}

export default Home;
