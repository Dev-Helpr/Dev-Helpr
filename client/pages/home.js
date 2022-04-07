import React, { useState, useEffect } from "react";
import Ticket from "./../component/ticket.js";
import TicketDescription from "./../component/ticketDescription.js";
import TicketCreator from "./../component/ticketCreator.js";
import axios from "axios";
import "./../stylesheets/home.css";

function Home({ user, tickets, ticketCreator, updateTicketUrgency }) {
  const [ticketIsClick, setTicketIsClick] = useState(false);
  const [createTicketIsClick, setCreateTicketIsClick] = useState(false);
  const [arrOfTicket, setArrOfTicket] = useState([]);

  const handleClick = () => setTicketIsClick(true);

  useEffect(() => {
    //fetch for tickets
    axios
      .get("/api/tickets/list")
      .then((res) => {
        //expected this to be an array of object, if not ticket then it will be an empty array
        console.log(res.data);
        const array = [];
        // setArrOfTicket(res.data);
        for (let i = 0; i < res.data.length; i++) {
          const {heading, problem} = res.data[i];
          console.log(problem);
          array.push(
            <Ticket
              key={i}
              heading={heading}
              brief={problem}
              handleClick={handleClick}
            />);
        }
        setArrOfTicket(array);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home">
      <div className="home__tickets">
        {arrOfTicket}
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
      <button onClick={() => setCreateTicketIsClick((prev) => !prev)}>
        +Create Ticket
      </button>
      {createTicketIsClick ? (
        <TicketCreator
          setCreateTicketIsClick={setCreateTicketIsClick}
          updateTicketUrgency={updateTicketUrgency}
          ticketCreator={ticketCreator}
          tickets={tickets}
          user_id={user.id}
        />
      ) : null}
      {/* userFeed */}
    </div>
  );
}

export default Home;
