import React, { useState, useEffect } from "react";
import Ticket from "./../component/ticket.js";
import TicketDescription from "./../component/ticketDescription.js";
import TicketCreator from "./../component/ticketCreator.js";
import axios from "axios";
import "./../stylesheets/home.css";
import Datetime from "../component/datetime.js";
import Clock from 'react-live-clock';
import click1 from "../audioclips/click1.mp3";
import signupBackground from '../images/signupBackground19.jpg'


function Home({ user, tickets, ticketCreator, updateTicketUrgency }) {
  const [ticketIsClick, setTicketIsClick] = useState(false);
  const [createTicketIsClick, setCreateTicketIsClick] = useState(false);
  const [arrOfTicket, setArrOfTicket] = useState([]);

  const handleClick = () => setTicketIsClick(true);

  const clickAudio = () => new Audio(click1).play();

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

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

    <img className="signupPhoto" src={signupBackground}/>


      <div class="container">
      <box className="box1"></box>
      <box className="box2"></box>
      <box className="ticketBody"></box>
      <box className="chatBox"></box>

      <box className="usersContainer-box">
          <p className="usersContainer-box-text ">Online Users:</p>
      </box>

        <p className="text1">Dev-helpr</p>
      </div>

      <div className="clock">
         <Clock
            format={'h:mm:ssa'}
            style={{fontSize: '1.5em'}}
            ticking={true} />
      </div>

      <div className = "clockTime">
            <Datetime />
      </div>

      <div className="home__tickets">
        {arrOfTicket}
        {/* <Ticket heading="Javascript" brief="wdd" handleClick={handleClick} />
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
        <Ticket heading="Python" brief="wdd" handleClick={handleClick} /> */}
      </div>
      {ticketIsClick ? (
        <TicketDescription />
      ) : (
        <div className="ticketDescription"></div>
      )}
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

      <div className="switchContainer">
          <input type="checkbox" id="switch" name="switch"/>
          <label for="switch" class="switch" onClick={() => {clickAudio(); setCreateTicketIsClick((prev) => !prev)}}>Create Ticket</label>
      </div>
    </div>
  );
}

export default Home;
