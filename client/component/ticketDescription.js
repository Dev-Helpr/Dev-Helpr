import React, { useState } from "react";
import TicketEditor from "./ticketEditor.js";
import "./../stylesheets/ticketDescription.css";
import axios from 'axios';
//How it looks like inside ticketDisplay
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
function ticketDescription({
  user,
  setTicketIsClick,
  setArrOfTicket,
  updateTicketUrgency,
  ticketCreator,
  tickets,
  getTicketStateWhenClickEdit,
  userId,
  ...ticketDisplay
}) {
  // console.log("from ticketDes: ", userId, +ticketDisplay.user_id);
  const [isEdit, setIsEdit] = useState(false);

  const resolveOnClick = (e) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    
    axios.delete(`api/tickets/${ticketDisplay._id}`, config).then(res => {
      setArrOfTicket([]);
      setTicketIsClick(false);
    })
  };

  return (
    <div className="ticketDescription">
      <h2 className="ticketDescription_heading_PL">Programming Language:</h2>
      <p className="ticketDescription_subject_PL">{ticketDisplay.heading}</p>

      <h2 className="ticketDescription_heading_Issue  ">What is the issue:</h2>
      <p className="ticketDescription_subject_Issue">{ticketDisplay.problem}</p>

      <h2 className="ticketDescription_heading_Tried">What have you tried:</h2>
      <p className="ticketDescription_subject_Tried">{ticketDisplay.tried}</p>

      <h2 className="ticketDescription_heading_Expect">What did you expect to happen:</h2>
      <p className="icketDescription_subject_Expect">{ticketDisplay.expect}</p> 

      {userId === +ticketDisplay.user_id ? (
        <div>
          <button onClick={() => setIsEdit((prev) => !prev)}>edit</button>
          <button onClick={resolveOnClick}>resolve</button>
        </div>
      ) : null}
      {isEdit ? (
        <TicketEditor
          user={user}
          setArrOfTicket={setArrOfTicket}
          updateTicketUrgency={updateTicketUrgency}
          ticketCreator={ticketCreator}
          tickets={tickets}
          getTicketStateWhenClickEdit={getTicketStateWhenClickEdit}
          setIsEdit={setIsEdit}
          {...ticketDisplay}
        />
      ) : null}
    </div>
  );
}

export default ticketDescription;
