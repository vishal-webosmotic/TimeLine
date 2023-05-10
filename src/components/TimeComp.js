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
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import {
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";

export default function OutlinedTimeline() {
  const [task, setTask] = useState(tasks);

  const [darkMode, setDarkMode] = useState(true);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "light" : "dark",
        },
      }),
    [darkMode]
  );

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
        item.status = "pending";
      } else {
        item.status = "done";
      }

      return item;
    });
  }, [task]);

  useEffect(() => {
    let timer;
    if (timeDiff.current) {
      timer = setTimeout(() => {
        setTask(createTimeline);
      }, timeDiff.current);
    }
    return () => clearTimeout(timer);
  }, [createTimeline]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          mt: 3,
        }}
      >
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
                    {moment.tz(item.date, "Japan").format("DD-MM-YYYY hh:mm A")}
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
      <IconButton onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </ThemeProvider>
  );
}
