import React, { useCallback, useEffect, useRef } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { TimelineOppositeContent } from "@mui/lab";
import moment from "moment/moment";
import tasks from "../Json/Task";
import { useState } from "react";
import { Stack } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default function OutlinedTimeline() {
  const [task, setTask] = useState(tasks);
  const timer = useRef();
  const setStatusColor = (status) => {
    let statusColor = "";

    if (status === "pending") {
      statusColor = "grey";
    } else if (status === "active") {
      statusColor = "red";
    } else {
      statusColor = "green";
    }
    return statusColor;
  };

  const visitedTimeLine = useCallback(() => {
    const currentDate = moment();
    let timeDiff = 0;
    setTask(
      tasks.map((item, i, arr) => {
        if (
          arr[i + 1]?.date &&
          currentDate.isBetween(moment(arr[i]?.date), moment(arr[i + 1]?.date))
        ) {
          timeDiff = Math.abs(
            moment(currentDate).diff(moment(arr[i + 1].date))
          );
          item.status = "active";
        } else if (currentDate.isBefore(moment(item.date))) {
          item.status = "pending";
        } else {
          item.status = "done";
        }
        return item;
      })
    );

    clearTimeout(timer.current);
    if (timeDiff) {
      timer.current = setTimeout(() => {
        visitedTimeLine();
      }, timeDiff);
    }
  }, []);

  useEffect(() => {
    visitedTimeLine();
  }, [visitedTimeLine]);

  const displayDate = (date) => {
    return moment(date).format("DD/MM/YYYY hh:mm:ss A");
  };

  const handleDateTimeChange = (dateTime) => {
    const newItem = {
      date: dateTime.toISOString(),
      activity: "New Activity",
      status: "",
    };

    setTask((prevData) => {
      const newData = [...prevData, newItem];
      newData.sort((a, b) => moment(a.date) - moment(b.date));
      return newData;
    });
  };

  return (
    <>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
            <DateTimePicker
              label="DateTime picker"
              value={moment()}
              // onChange={(newValue) => setNewDate(newValue)}
              onChange={(newValue) => handleDateTimeChange(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Timeline position="alternate">
          {task.map((item) => {
            return (
              <TimelineItem key={item.date + item.activity}>
                <TimelineOppositeContent>
                  {displayDate(item.date)}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    variant="outlined"
                    sx={{ backgroundColor: setStatusColor(item.status) }}
                  />
                  <TimelineConnector
                    sx={{ backgroundColor: setStatusColor(item.status) }}
                  />
                </TimelineSeparator>
                <TimelineContent>{item.activity}</TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Stack>
    </>
  );
}

// import React, { useCallback, useEffect, useRef } from "react";
// import Timeline from "@mui/lab/Timeline";
// import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
// import moment from "moment/moment";
// import tasks from "../Json/Task";
// import { useState } from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// import { TimelineOppositeContent } from "@mui/lab";
// import { Stack } from "@mui/material";

// export default function OutlinedTimeline() {
//   const [task, setTask] = useState(tasks);
//   const timer = useRef();
//   const [newDate, setNewDate] = useState("");

//   useEffect(() => {
//     if (newDate) {
//       console.log(newDate, task);
//       // setTask(task.push(newDate));
//     }
//   }, [newDate, task]);

//   const setStatusColor = (status) => {
//     let statusColor = "";
//     if (status === "pending") {
//       statusColor = "grey";
//     } else if (status === "active") {
//       statusColor = "red";
//     } else {
//       statusColor = "green";
//     }
//     return statusColor;
//   };

//   const visitedTimeLine = useCallback(() => {
//     const currentDate = moment();
//     let timeDiff = 0;
//     setTask(
//       tasks.map((item, i, arr) => {
//         if (
//           arr[i + 1]?.date &&
//           currentDate.isBetween(moment(arr[i]?.date), moment(arr[i + 1]?.date))
//         ) {
//           timeDiff = Math.abs(
//             moment(currentDate).diff(moment(arr[i + 1].date))
//           );
//           item.status = "active";
//         } else if (currentDate.isBefore(moment(item.date))) {
//           item.status = "pending";
//         } else {
//           item.status = "done";
//         }
//         return item;
//       })
//     );

//     clearTimeout(timer.current);
//     if (timeDiff) {
//       timer.current = setTimeout(() => {
//         visitedTimeLine();
//       }, timeDiff);
//     }
//   }, []);

//   useEffect(() => {
//     visitedTimeLine();
//   }, [visitedTimeLine]);

//   const displayDate = (date) => {
//     return moment(date).format("DD/MM/YYYY hh:mm:ss A");
//   };

//   const handleDateTimeChange = (dateTime) => {
//     // setNewDate(newItem);

//     const newItem = {
//       date: dateTime.toISOString(),
//       activity: "New Activity",
//       status: "",
//     };

//     setTask((prevData) => {
//       const newData = [...prevData, newItem];
//       newData.sort((a, b) => moment(a.date) - moment(b.date));
//       return newData;
//     });
//   };
//   return (
//     <>
//       <Stack
//         spacing={{ xs: 1, sm: 2 }}
//         direction="row"
//         useFlexGap
//         flexWrap="wrap"
//       >
//         <LocalizationProvider dateAdapter={AdapterMoment}>
//           <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
//             <DateTimePicker
//               label="DateTime picker"
//               value={newDate}
//               // onChange={(newValue) => setNewDate(newValue)}
//               onChange={(newValue) => handleDateTimeChange(newValue)}
//             />
//           </DemoContainer>
//         </LocalizationProvider>
//         <Timeline position="alternate">
//           {task.map((item) => {
//             return (
//               <TimelineItem key={item.date + item.activity}>
//                 <TimelineOppositeContent>
//                   {displayDate(item.date)}
//                 </TimelineOppositeContent>
//                 <TimelineSeparator>
//                   <TimelineDot
//                     variant="outlined"
//                     sx={{ backgroundColor: setStatusColor(item.status) }}
//                   />
//                   <TimelineConnector
//                     sx={{ backgroundColor: setStatusColor(item.status) }}
//                   />
//                 </TimelineSeparator>
//                 <TimelineContent>{item.activity}</TimelineContent>
//               </TimelineItem>
//             );
//           })}
//         </Timeline>
//       </Stack>
//     </>
//   );
// }
