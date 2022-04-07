import React, { useState, useEffect } from "react";
import Ticket from "./../component/ticket.js";
import TicketDescription from "./../component/ticketDescription.js";
import TicketCreator from "./../component/ticketCreator.js";
import axios from "axios";
import "./../stylesheets/home.css";

function Home({
  user,
  tickets,
  ticketCreator,
  updateTicketUrgency,
  getTicketStateWhenClickEdit,
}) {
  const [ticketIsClick, setTicketIsClick] = useState(false);
  const [createTicketIsClick, setCreateTicketIsClick] = useState(false);
  const [arrOfTicket, setArrOfTicket] = useState([]);
  const [ticketDisplay, setTicketDisplay] = useState({});
  const handleClick = (id) => {
     const config = {
       headers: {
         Authorization: `Bearer ${user.accessToken}`,
       },
     };
    axios
      .get(`/api/tickets/${id}`, config)
      .then((res) => {
        setTicketDisplay(res.data);
        setTicketIsClick(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //fetch for tickets
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    axios
      .get("/api/tickets/list?_sort=id&_order=asc", config)
      .then((res) => {
        //expected this to be an array of object, if not ticket then it will be an empty array
        console.log("data: ", res.data);
        const array = [];
        // setArrOfTicket(res.data);
        for (let i = res.data.length - 1; i > 0; i--) {
          const { heading, problem, _id } = res.data[i];
          array.push(
            <Ticket
              id={_id}
              key={i}
              heading={heading}
              brief={problem}
              handleClick={handleClick}
            />
          );
        }
        setArrOfTicket(array);
      })
      .catch((err) => console.log(err));
      //
  }, [arrOfTicket.length]);


  return (
    <div className="home">
      <button onClick={() => setCreateTicketIsClick((prev) => !prev)}>
        +Create Ticket
      </button>
      <div className="home__tickets">{arrOfTicket}</div>
      {ticketIsClick ? (
        <TicketDescription
          user={user}
          setTicketIsClick={setTicketIsClick}
          setArrOfTicket={setArrOfTicket}
          updateTicketUrgency={updateTicketUrgency}
          ticketCreator={ticketCreator}
          tickets={tickets}
          getTicketStateWhenClickEdit={getTicketStateWhenClickEdit}
          {...ticketDisplay}
          userId={user.id}
        />
      ) : (
        <div className="ticketDescription">hi</div>
      )}

      {createTicketIsClick ? (
        <TicketCreator
          user={user}
          setArrOfTicket={setArrOfTicket}
          arrOfTicket={arrOfTicket}
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
