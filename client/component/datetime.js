import React from "react";

const Datetime = () => {
    const showdate = new Date();
    // var displaytodaysDate = showdate.getDate() + "/" + (showdate.getMonth()+1) + '/' + showdate.getFullYear();
    const dt=showdate.toDateString();
    const displaytime=showdate.getHours()+':' + showdate.getMinutes() + ':' + showdate.getSeconds();
    return (
        <div>
            {/* <input type='text' value={displaytodaysDate} readOnly='true' /> */}
            {dt}        {/* {dt} - {displaytime} */}
        </div>
    )
}

export default Datetime;

