import second from "../stylesheets/ticketCreator.css";
import React, { useState } from "react";
import "./../stylesheets/ticketCreator.css";
import axios from "axios";
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
    const values = {...tickets, user_id: user_id};
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

  return (
    <div className="ticketCreator">
      <div className="ticketCreator__content">
        <form onSubmit={handleSubmit}>
          [this is a ticket]
          <button onClick={() => setCreateTicketIsClick((prev) => !prev)}>
            X
          </button>
          <form
            className="ticketCreator__content"
            onSubmit={handleSubmitCreateTicket}
          >
            <label>
              Heading?
              <input
                required={true}
                type="text"
                name="heading"
                onChange={ticketCreator}
              />
            </label>
            <label>
              problem?
              <textarea
                required={true}
                className="ticketCreator__textarea"
                name="problem"
                onChange={ticketCreator}
              />
              {tickets.problem.length + "/255"}
            </label>
            <br/>
            <label>
              tried?
              <textarea
                required={true}
                className="ticketCreator__textarea"
                name="tried"
                onChange={ticketCreator}
              />
              {tickets.tried.length + "/255"}
            </label>
            <br/>
            <label>
              expect?
              <textarea
                required={true}
                className="ticketCreator__textarea"
                name="expect"
                onChange={ticketCreator}
              />
              {tickets.expect.length + "/255"}
            </label>
            <br/>
            <label>
              hypothesis?
              <textarea
                required={true}
                className="ticketCreator__textarea"
                name="hypothesis"
                onChange={ticketCreator}
              />
              {tickets.hypothesis.length + "/255"}
            </label>
            <br/>
            <label>
              brief?
              <textarea
                required={true}
                className="ticketCreator__textarea"
                name="brief"
                onChange={ticketCreator}
              />
              {tickets.brief.length + "/255"}
            </label>
            <br/>
            <label>
              Urgency?
              <label>
                Very urgent
                <input
                  type="checkbox"
                  name="urgency"
                  value={3}
                  onChange={handleCheckbox}
                />
              </label>
              <label>
                Urgent
                <input
                  type="checkbox"
                  name="urgency"
                  value={2}
                  onChange={handleCheckbox}
                />
              </label>
              <label>
                Not urgent
                <input
                  type="checkbox"
                  name="urgency"
                  value={1}
                  onChange={handleCheckbox}
                />
              </label>
            </label>
            <button type="submit">Submit</button>
          </form>
        </form>
      </div>
    </div>
  )
}

export default TicketCreator;
