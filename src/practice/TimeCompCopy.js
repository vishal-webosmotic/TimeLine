import { Stack, ThemeProvider, createTheme, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CssBaseline from "@mui/material/CssBaseline";

import MuiTimeLine from "./components/MuiTimeLine";
import AddRoutine from "./components/AddRoutine";

import { timeline as timelineJson } from "./utils/timelineJson";
import { useEffect, useState, useRef, useMemo } from "react";

import { dayJs } from "./utils/dayJs";

function App() {
  const timeoutSeconds = useRef(0);

  const [timeline, setTimeline] = useState(timelineJson);
  const [mode, setMode] = useState(true);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ? "light" : "dark",
        },
      }),
    [mode]
  );

  const newTimeLine = useMemo(() => {
    const currentTime = dayJs().utc().format();
    let isActive = false;

    return timeline.map((value, i, arr) => {
      if (!isActive) {
        if (
          dayJs(currentTime).isAfter(value.time) ||
          dayJs(currentTime).isSame(value.time)
        ) {
          if (i === arr.length - 1) {
            value.status = "active";
            timeoutSeconds.current = null;
          } else value.status = "visited";
        } else if (dayJs(currentTime).isBefore(value.time)) {
          isActive = true;
          arr[i - 1].status = "active";
          value.status = "";
          timeoutSeconds.current = dayJs(value.time).diff(
            currentTime,
            "millisecond"
          );
        }
      }
      return value;
    });
  }, [timeline]);

  useEffect(() => {
    let timer;
    if (timeoutSeconds.current) {
      timer = setTimeout(() => {
        setTimeline(newTimeLine);
      }, timeoutSeconds.current);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [newTimeLine]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack className="App">
        <Stack direction={"row"}>
          <AddRoutine timelineJson={timeline} setTimeline={setTimeline} />
          <MuiTimeLine timelineJson={newTimeLine} />
        </Stack>
      </Stack>
      <IconButton onClick={() => setMode(!mode)} color="inherit">
        {mode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </ThemeProvider>
  );
}

export default App;


//part 2

/*
import React, { useEffect, useMemo, useRef } from "react";
import "moment-timezone";
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
import Box from "@mui/material/Box";
import DatePickerComp from "./DatePickerComp";
import { Stack } from "@mui/material";


export default function OutlinedTimeline() {
  const [task, setTask] = useState(tasks);
  const local = moment.tz.guess();
  console.log(local);

  const timeDiff = useRef(0);
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

  const createTimeline = useMemo(() => {
    const currentDate = moment().utc();
    return task?.map((item, i, arr) => {
      if (
        arr[i + 1]?.date &&
        currentDate.isBetween(moment(arr[i]?.date), moment(arr[i + 1]?.date))
      ) {
        timeDiff.current = Math.abs(
          moment(currentDate).diff(moment(arr[i + 1].date).utc())
        );
        item.status = "active";
      } else if (currentDate.isBefore(moment(item.date).utc())) {
        item.status = "done";
      } else {
        item.status = "pending";
      }

      return item;
    });
  }, [task]);

  useEffect(() => {
    let timer;
    if (timeDiff.current) {
      console.log("line 61");
      timer = setTimeout(() => {
        setTask(createTimeline);
      }, timeDiff.current);
    }
    return () => clearTimeout(timer);
  }, [createTimeline]);


  return (
    <Box>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <DatePickerComp task={task} setTask={setTask} />
        <Timeline position="alternate">
          {createTimeline.map((item) => {
            return (
              <TimelineItem key={item.date + item.activity}>
                <TimelineOppositeContent>
                
                  {console.log(moment(item.date).tz("Asia/Calcutta"))}
                  {moment
                    .tz(item.date, "Asia/Calcutta")
                    .format("DD-MM-YYYY hh:mm A")}
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
    </Box>
  );
}

///////////////////////////







// {/* <MuiTypography /> */}
// {/* <MuiButtons /> */}
// {/* <MuiInputs />
// <MuiCheckBox /> */}
// {/* <MuiSelect /> */}
// {/* <SignUp /> */}
// import React, { useEffect, useMemo, useRef } from "react";
// import "moment-timezone";
// import Timeline from "@mui/lab/Timeline";
// import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
// import { TimelineOppositeContent } from "@mui/lab";
// import moment from "moment/moment";
// import tasks from "../Json/Task";
// import { useState } from "react";
// import Box from "@mui/material/Box";
// import DatePickerComp from "./DatePickerComp";
// import { Stack } from "@mui/material";

// export default function OutlinedTimeline() {
//   const [task, setTask] = useState(tasks);
//   // const timer = useRef();
//   const timeDiff = useRef(0);
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

//   const createTimeline = useMemo(() => {
//     const currentDate = moment().utc();
//     return task?.map((item, i, arr) => {
//       if (
//         arr[i + 1]?.date &&
//         currentDate.isBetween(moment(arr[i]?.date), moment(arr[i + 1]?.date))
//       ) {
//         timeDiff.current = Math.abs(
//           moment(currentDate).diff(moment(arr[i + 1].date).utc())
//         );
//         item.status = "active";
//       } else if (currentDate.isBefore(moment(item.date).utc())) {
//         item.status = "done";
//       } else {
//         item.status = "pending";
//       }

//       return item;
//     });
//   }, [task]);

//   useEffect(() => {
//     if (timeDiff.current) {
//       const timer = setTimeout(() => {
//         setTask(createTimeline);
//       }, timeDiff.current);
//       return () => clearTimeout(timer);
//     }
//   }, [createTimeline]);

//   const displayDate = (date) => {
//     console.log(date);
//     return moment(date).utc().format("DD/MM/YYYY hh:mm:ss A");
//     // return moment(date).utc().format("DD/MM/YYYY hh:mm:ss A");
//   };

//   return (
//     <Box>
//       <Stack
//         spacing={{ xs: 1, sm: 2 }}
//         direction="row"
//         useFlexGap
//         flexWrap="wrap"
//       >
//         <DatePickerComp task={task} setTask={setTask} />
//         <Timeline position="alternate">
//           {createTimeline.map((item) => {
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
//     </Box>
//   );
// }
