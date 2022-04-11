import React, { useState, useEffect } from "react";
import Ticket from "./../component/ticket.js";
import TicketDescription from "./../component/ticketDescription.js";
import TicketCreator from "./../component/ticketCreator.js";
import UserItem from "../component/userItem.js";
import axios from "axios";
import "./../stylesheets/home.css";
import Datetime from "../component/datetime.js";
import Clock from "react-live-clock";
import click1 from "../audioclips/click1.mp3";
import signupBackground from "../images/signupBackground19.jpg";
import Chatbox from "../component/Chatbox.js";
// import io from 'socket.io-client';




function Home({
  user,
  tickets,
  ticketCreator,
  updateTicketUrgency,
  getTicketStateWhenClickEdit,
}) {
  ;
  //if false, it's an empty div. If true, it will show the whole ticket in the middle of the screen
  const [ticketIsClick, setTicketIsClick] = useState(false);
  const [createTicketIsClick, setCreateTicketIsClick] = useState(false);
  //Used in useEffect to get all the tickets from the database
  const [arrOfTicket, setArrOfTicket] = useState([]);
  const [arrOfUsers, setArrOfUsers] = useState([]);
  //User can click their username on the right siide to change status from online, to helper, to seeking help
  //blue = neutral, yellow = helper, red = seekingHelp
  const [updateStatus, setUpdateStatus] = useState(true);
  //This will grab all data from the ticket that is clicked and props drill into TicketDescription.js to show the whoe ticket in the middle of the screen
  const [ticketDisplay, setTicketDisplay] = useState({});
  const clickAudio = () => new Audio(click1).play();
  const filterOnlineUserNames = (userFromList) => {
    if (userFromList.props.online === true) {
      return true
    }
    return false
  };
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

  //fetch all users from DB. This function is called inside useEffect
  const fetchUserList = () => {
    //Every call to the database will need accessToken otherwise the request will not go through.
    //accessToken has a lifepan of 10 mins and is stored inside user state.
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    axios
      .get("/api/users/", config)
      .then((res) => {
        //res.data is an array of users' object
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

  useEffect(() => {
    //fetch for tickets
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    axios
      .get("/api/tickets/list?_sort=id&_order=DESC", config)
      .then((res) => {
        //expected this to be an array of object, if not ticket then it will be an empty array
        // console.log("data: ", res.data);
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
    fetchUserList();
  }, [arrOfTicket.length, updateStatus]);


  return (
    <div className="home">
      <img className="signupPhoto" src={signupBackground} />
      <div class="container">
        <box className="box1"></box>
        <box className="box2"></box>
        <box className="ticketBody"></box>
        <box className="usersList-Box1"></box>
        <box className="chatBox">
          <Chatbox
          // socket={socket}
           user={user}
           onlineUsers={arrOfUsers.filter(filterOnlineUserNames)}/>
        </box>
        <box className="usersContainer-box">
          <p className="usersContainer-box-text1 ">Online Users:</p>
          <p className="usersContainer-box-text2 ">Online Status:</p>
        </box>

        <div className="login-fade-in-image1">
            <p className="text1">Dev-helpr</p>
        </div>

      </div>

      <div className="boxBackground"></div>

      <div className="clock">
        <Clock
          format={"h:mm:ssa"}
          style={{ fontSize: "1.5em" }}
          ticking={true}
        />
      </div>
      <div className="clockTime">
        <Datetime />
      </div>
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
        <div className="ticketDescription"></div>
      )}
      {/* Too much prop drills. Kind of kill the purpose of using redux. */}
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
      <div className="switchContainer">
        <input type="checkbox" id="switch" name="switch" />
        <label
          for="switch"
          class="switch"
          onClick={() => {
            clickAudio();
            setCreateTicketIsClick((prev) => !prev);
          }}
        >
          Create Ticket
        </label>
      </div>
      <div className="home__users">{arrOfUsers}</div>
    </div>
  );
}
export default Home;
