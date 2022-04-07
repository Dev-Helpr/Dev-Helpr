import React, { useState, useEffect } from "react";
import Ticket from "./../component/ticket.js";
import TicketDescription from "./../component/ticketDescription.js";
import TicketCreator from "./../component/ticketCreator.js";
import UserItem from "../component/userItem.js";
import axios from "axios";
import "./../stylesheets/home.css";
import {useSelector} from "react-redux";



function Home({ user, tickets, ticketCreator, updateTicketUrgency }) {
  const [ticketIsClick, setTicketIsClick] = useState(false);
  const [createTicketIsClick, setCreateTicketIsClick] = useState(false);
  const [arrOfTicket, setArrOfTicket] = useState([]);
  const [arrOfUSers, setArrOfUsers] = useState([]);
  const currentUser = useSelector((state) => state.users);
  const { accessToken } = currentUser;

  const handleClick = () => setTicketIsClick(true);
  // console.log('HERE IS ACCESS TOKEN:  ', accessToken)
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  //fetch for users
  const fetchUserList = () => {
    axios
    .get("/api/users/", config)
    .then((res) => {
      //expected this to be an array of object, if not ticket then it will be an empty array
      console.log('USER LIST:  ',res.data);
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
            
          />);
      }
      setArrOfUsers(array);
    })
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    //fetch for tickets
    axios
      .get("/api/tickets/list", config)
      .then((res) => {
        //expected this to be an array of object, if not ticket then it will be an empty array
        // console.log(res.data);
        const array = [];
        // setArrOfTicket(res.data);
        for (let i = 0; i < res.data.length; i++) {
          const {heading, problem} = res.data[i];
          // console.log(problem);
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

      fetchUserList();
}, []);


 
  

  return (
    <div className="home">
      <div className="home__tickets">
        {arrOfTicket}      
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
      <div className="home_users">
        {arrOfUSers}
      </div>
    </div>
  );
}

export default Home;
