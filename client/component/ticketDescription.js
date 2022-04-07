import React, { useState } from "react";
import TicketEditor from "./ticketEditor.js";
import "./../stylesheets/ticketDescription.css";
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
  ticketCreator,
  tickets,
  getTicketStateWhenClickEdit,
  userId,
  ...ticketDisplay
}) {
  // console.log("from ticketDes: ", userId, +ticketDisplay.user_id);
  const [isEdit, setIsEdit] = useState(false);

  const resolveOnClick = (e) => {};

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
