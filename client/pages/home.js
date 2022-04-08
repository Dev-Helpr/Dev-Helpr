import React, { useState, useEffect } from "react";
import Ticket from "./../components/ticket.js";
import TicketDescription from "./../components/ticketDescription.js";
import TicketCreator from "./../components/ticketCreator.js";
import UserItem from "../components/userItem.js";
import axios from "axios";
import "./../stylesheets/home.css";
import Chatbox from "../components/Chatbox.jsx";

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
  //these 2 lines
  const [arrOfUsers, setArrOfUsers] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(true);

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
  //this whole function
  //fetch for users
  const fetchUserList = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    axios
      .get("/api/users/", config)
      .then((res) => {
        //expected this to be an array of object, if not ticket then it will be an empty array
        console.log("USER LIST:  ", res.data);
        const array = [];
        // setArrOfTicket(res.data);
        for (let i = 0; i < res.data.length; i++) {
          const { _id, username, online, status } = res.data[i];
          array.push(
            <UserItem
              key={i}
              id={_id}
              username={username}
              online={online}
              status={status}
              setUpdateStatus={setUpdateStatus}
            />
          );
        }
        setArrOfUsers(array);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   //fetch for tickets
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${user.accessToken}`,
  //     },
  //   };
  //   axios
  //     .get("/api/tickets/list?_sort=id&_order=DESC", config)
  //     .then((res) => {
  //       //expected this to be an array of object, if not ticket then it will be an empty array
  //       console.log("data: ", res.data);
  //       const array = [];
  //       // setArrOfTicket(res.data);
  //       for (let i = res.data.length - 1; i > 0; i--) {
  //         const { heading, problem, _id } = res.data[i];
  //         array.push(
  //           <Ticket
  //             id={_id}
  //             key={i}
  //             heading={heading}
  //             brief={problem}
  //             handleClick={handleClick}
  //           />
  //         );
  //       }
  //       setArrOfTicket(array);
  //     })
  //     .catch((err) => console.log(err));
  //     fetchUserList();
  // }, [arrOfTicket.length, updateStatus]);

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
      <button onClick={handleClick}>+Create Ticket</button>
      {createTicketIsClick ? <TicketCreator /> : null}

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
       userFeed
      <div className="home__users">{arrOfUsers}</div>
    </div>
  );
}

export default Home;
