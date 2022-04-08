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
      <h2>Heading</h2>
      <p>{ticketDisplay.heading}</p>
      <h2>Problem</h2>
      <p>{ticketDisplay.problem}</p>
      <h2>Tried</h2>
      <p>{ticketDisplay.tried}</p>
      <h2>Expected</h2>
      <p>{ticketDisplay.expect}</p>
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
