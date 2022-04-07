import axios from 'axios';
import React, {useEffect, useState} from 'react'
import './../stylesheets/userItem.css'
import {useSelector} from "react-redux";



function UserItem({ id, username, online, status, }) {
  const [arrOfUSers, setArrOfUsers] = useState([]);
  const currentUser = useSelector((state) => state.users);
  const { accessToken } = currentUser;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchUserList = () => {

    axios
    .get("/api/users/", config)
    .then((res) => {
      //expected this to be an array of object, if not ticket then it will be an empty array
      // console.log('USER LIST:  ',res.data);
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

          />);
      }
      setArrOfUsers(array);
    })
    .catch((err) => console.log(err));
  };

  const handleStatusClick = (status, id) => {
    let newStatus;
    status === 'neutral' ? newStatus = "'seekingHelp'" :
    status === 'seekingHelp' ? newStatus = "'helper'" :
    newStatus = "'neutral'";
    console.log('NEW STATUS:   ',newStatus)

    axios
    .put(`/api/users/${id}`, {status: newStatus}, config)
    .then((res) => {
      console.log(res)
    })
    
    useEffect(()=> {
      fetchUserList();
      
    }, [])
  };

  return (
    <div className={`user ${online ? "" : "offline"}`} >
      {/* <div className='ghost'></div> */}
      <div className='userName'>
        <h2 style={online === false ? {color: "#595151", opacity: "50%"} : status === "seekingHelp" ? {color: "#FFD900"} : status === "helper" ? {color: "#16a318"} :  {color: "#0000FF"} }>
        {username}
        </h2>
      </div>
      {/* <div className="user__topic"> */}
        {/* <h3>Online: {online.toString()} </h3>
        <p>Status: {status}</p> */}
      <div className='btn-container' >
        <button onClick={()=>handleStatusClick(status, id)}className={`status_button ${online ? "" : "hide_status"}`} style={ status === "seekingHelp" ? {backgroundColor: "#FFD900"} : status === "helper" ? {backgroundColor: "#16a318"} :  {backgroundColor: "#5A79AF"} }></button>

      </div>
      {/* <div className="ticket__brief">
        <h3>Brief</h3>
        <p>{brief}</p>
      </div> */}
    </div>
  );
}

export default UserItem