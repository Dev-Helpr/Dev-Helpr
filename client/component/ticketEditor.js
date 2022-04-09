import React, { useEffect } from "react";
import "./../stylesheets/ticketEditor.css";
import axios from "axios";
/*
expect: "dsfsd"
heading: "something"
hypothesis: "dsfsf"
inprogress: false
problem: "sdfs"
ready1: false
ready2: false
tried: "dffs"
urgency: 2
user_id: "24"
_id: 10
*/

function TicketEditor({
  user,
  setArrOfTicket,
  updateTicketUrgency,
  ticketCreator,
  tickets,
  getTicketStateWhenClickEdit,
  setIsEdit,
  ...ticketDisplay
}) {
  console.log("tickets: ", tickets);
  //this will update ticket state in redux whenever this form is load
  useEffect(() => {
    const obj = {
      expect: ticketDisplay.expect,
      heading: ticketDisplay.heading,
      hypothesis: ticketDisplay.hypothesis,
      inProgress: ticketDisplay.inprogress,
      problem: ticketDisplay.problem,
      ready1: ticketDisplay.ready1,
      ready2: ticketDisplay.ready2,
      tried: ticketDisplay.tried,
      urgency: ticketDisplay.urgency,
      user_id: ticketDisplay.user_id,
    };
    getTicketStateWhenClickEdit(obj);
  }, []);

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      updateTicketUrgency(e);
    } else {
      updateTicketUrgency();
    }
  };
  //submit will send a put request to backend api/ticket/${ticketId}
  //this request doesn't return anyting
  const handleSubmitTicketEditor = (e) => {
    e.preventDefault();

const config = {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  };


    axios
      .put(`api/tickets/${ticketDisplay._id}`, tickets, config)
      .then((res) => {
        setArrOfTicket([]);
        setIsEdit(false);
      })
      .catch((err) => console.log(err));
  };

  const handleTicketEditor = (e) => {
    e.preventDefault();
    ticketCreator(e);
  };

  return (
    <div className="ticketEditor">
      <div className="ticketEditor__content">
        <button className="closeButton_Editor" onClick={() => {setIsEdit((prev) => !prev); clickAudio()}}>x</button>
        <form
          className="ticketEditor__content"
          onSubmit={handleSubmitTicketEditor}
        >
          <label>
          Programming Language:
            <input
              required={true}
              type="text"
              name="heading"
              value={tickets.heading}
              onChange={handleTicketEditor}
            ></input>
          </label>
          <label>
            What is the issue:
            <textarea
              required={true}
              value={tickets.problem}
              className="ticketEditor__textarea"
              name="problem"
              onChange={handleTicketEditor}
            ></textarea>
            {tickets.problem.length + "/255"}
          </label>
          <br />
          <label>
          What have you tried:
            <textarea
              value={tickets.tried}
              required={true}
              className="ticketEditor__textarea"
              name="tried"
              onChange={handleTicketEditor}
            ></textarea>
            {tickets.tried.length + "/255"}
          </label>
          <br />
          <label>
          What did you expect to happen:
            <textarea
              value={tickets.expect}
              required={true}
              className="ticketEditor__textarea"
              name="expect"
              onChange={handleTicketEditor}
            ></textarea>
            {tickets.expect.length + "/255"}
          </label>
          <br />
          <label>
          Reason why you think it isn't working:
            <textarea
              value={tickets.hypothesis}
              required={true}
              className="ticketEditor__textarea"
              name="hypothesis"
              onChange={handleTicketEditor}
            ></textarea>
            {tickets.hypothesis.length + "/255"}
          </label>
          <br />
          <label>
          Brief:
            <textarea
              value={tickets.brief}
              required={true}
              className="ticketEditor__textarea"
              name="brief"
              onChange={handleTicketEditor}
            ></textarea>
            {tickets.brief.length + "/255"}
          </label>
          <br />
          <label>
            Urgency?
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
          <button className = "submitButton_Editor" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default TicketEditor;
