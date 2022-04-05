import React from 'react'
import Ticket from './../component/ticket.js'
import './../stylesheets/home.css'

function Home() {


  return (
    <div className="home">
      <div className="home__tickets">
        <Ticket heading="Javascript" brief=''/>
        <Ticket heading='C++' />
        <Ticket heading='Java' />
        <Ticket heading='Python' />
      </div>
    </div>
  );
}

export default Home