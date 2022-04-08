import axios from "axios";
import React, { useEffect, useState } from "react";
import "./../stylesheets/userItem.css";
import { useSelector } from "react-redux";

function UserItem({ id, username, online, status, setUpdateStatus }) {
  const [arrOfUSers, setArrOfUsers] = useState([]);
  const currentUser = useSelector((state) => state.users);
  const { accessToken } = currentUser;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleStatusClick = (status, id) => {
    let newStatus;
    status === "neutral"
      ? (newStatus = "'seekingHelp'")
      : status === "seekingHelp"
      ? (newStatus = "'helper'")
      : (newStatus = "'neutral'");
    console.log("NEW STATUS:   ", newStatus);

    axios.put(`/api/users/${id}`, { status: newStatus }, config).then((res) => {
      setUpdateStatus((prev) => !prev);
      console.log("UPDATE STATUS");
    });
  };

  return (
    
    <div className={`user ${online ? "" : "offline"}`}>
      {/* <div className='ghost'></div> */}
      <div className="userName">
        <h2
          style={
            online === false
              ? { color: "#FFFFFF", opacity: "50%" }
              : status === "seekingHelp"
              ? { color: "#FFFFFF" }
              : status === "helper"
              ? { color: "#FFFFFF" }
              : { color: "#FFFFFF" }
          }
        >
          {username}
        </h2>
      </div>

      {/* <div className="user__topic"> */}
      {/* <h3>Online: {online.toString()} </h3>
        <p>Status: {status}</p> */}
      <div className="btn-container">
        <button
          onClick={() => handleStatusClick(status, id)}
          className={`status_button_2 ${online ? "" : "hide_status"}`}
          style={
            status === "seekingHelp"
              ? { backgroundColor: "#FFD900" }
              : status === "helper"
              ? { backgroundColor: "#16a318" }
              : { backgroundColor: "#5353f3" }
          }
        ></button>
     
      </div>
      {/* <div className="ticket__brief">
        <h3>Brief</h3>
        <p>{brief}</p>
      </div> */}
    </div>
  );
}

export default UserItem;
