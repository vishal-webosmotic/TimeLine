import { useState, useEffect } from "react";
import moment from "moment/moment";

function Clock() {
  const [date, setDate] = useState();
  let now = moment();
  let time = now.hour() + ":" + now.minutes() + ":" + now.seconds();
  time = time + (now.hour() >= 12 ? ":PM" : " AM");
  console.log(time.split(":"));
  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 5000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return <span>{time}</span>;
}
export default Clock;
