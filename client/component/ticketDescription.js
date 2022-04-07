import React from "react";
import "./../stylesheets/ticketDescription.css";
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
function ticketDescription({ ...ticketDisplay }) {
  console.log('hi: ', ticketDisplay);
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
    </div>
  );
}

export default ticketDescription;
