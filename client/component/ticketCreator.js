import React, { useState } from "react";
import "./../stylesheets/ticketCreator.css";
import axios from "axios";
import click1 from "../audioclips/click1.mp3";

// {
//   problem: '',
//   tried: '',
//   expect: '',
//   hypothesis: '',
//   urgency: 1,
//   inProgress: false,
//   heading: '',
//   brief: '',
//   user_id: 0,
// }
function TicketCreator({
  user,
  ticketCreator,
  tickets,
  updateTicketUrgency,
  setCreateTicketIsClick,
  user_id,
  arrOfTicket,
  setArrOfTicket,
}) {
  const handleCheckbox = (e) => {
    if (e.target.checked) {
      updateTicketUrgency(e);
    } else {
      updateTicketUrgency();
    }
  };

  const handleSubmitCreateTicket = (e) => {
    e.preventDefault();
    //uncomment to test for create new ticket route
    const values = { ...tickets, user_id: user_id };
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    axios
      .post("/api/tickets", values, config)
      .then((res) => {
        //there is no response from backend
        //set to false  after get a response from backend
        setArrOfTicket([]);
        setCreateTicketIsClick(false);
      })
      .catch((err) => console.log(err));
  };

  const clickAudio = () => new Audio(click1).play();


  return (
    <div className="ticketCreator">
      <div className="ticketCreator__content">
        <button
          className="closeButton"
          onClick={() => {
            setCreateTicketIsClick((prev) => !prev);
            clickAudio();
          }}
        >
          Close X
        </button>
        <form
          className="ticketCreator__content"
          onSubmit={handleSubmitCreateTicket}
        >
          <label>
            Programming Language:
            <input
              required={true}
              type="text"
              name="heading"
              onChange={ticketCreator}
            ></input>
          </label>
          <label>
            What is the issue:
            <textarea
              required={true}
              className="ticketCreator__textarea"
              name="problem"
              onChange={ticketCreator}
            ></textarea>
            {tickets.problem.length + "/255"}
          </label>
          <br />
          <label>
            What have you tried:
            <textarea
              required={true}
              className="ticketCreator__textarea"
              name="tried"
              onChange={ticketCreator}
            ></textarea>
            {tickets.tried.length + "/255"}
          </label>
          <br />
          <label>
            What did you expect to happen:
            <textarea
              required={true}
              className="ticketCreator__textarea"
              name="expect"
              onChange={ticketCreator}
            ></textarea>
            {tickets.expect.length + "/255"}
          </label>
          <br />
          <label>
            Reason why you think it isn't working:
            <textarea
              required={true}
              className="ticketCreator__textarea"
              name="hypothesis"
              onChange={ticketCreator}
            ></textarea>
            {tickets.hypothesis.length + "/255"}
          </label>
          <br />
          <label>
            Brief:
            <textarea
              required={true}
              className="ticketCreator__textarea"
              name="brief"
              onChange={ticketCreator}
            ></textarea>
            {tickets.brief.length + "/255"}
          </label>
          <br />
          <label>
            Urgency:
            <label>
              Very urgent
              <input
                type="checkbox"
                name="urgency"
                value={3}
                onChange={handleCheckbox}
              ></input>
            </label>
            <label>
              Urgent
              <input
                type="checkbox"
                name="urgency"
                value={2}
                onChange={handleCheckbox}
              ></input>
            </label>
            <button className="submitButton" type="submit">
              Submit Ticket
            </button>
            <label>
              Not urgent
              <input
                type="checkbox"
                name="urgency"
                value={1}
                onChange={handleCheckbox}
              ></input>
            </label>
          </label>
        </form>
      </div>
    </div>
  );
}

export default TicketCreator;
