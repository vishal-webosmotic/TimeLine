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
import { Grid } from "@mui/material";

import DatePickerComp from "./DatePickerComp";

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

  return (
    <>
      <Grid container spacing={2}>
        <Grid container item xs={6} direction="column">
          <DatePickerComp task={task} setTask={task} />
        </Grid>
        <Grid container item xs={6} direction="column">
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
        </Grid>
      </Grid>
    </>
  );
}
