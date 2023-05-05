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

export default function OutlinedTimeline() {
  const [task, setTask] = useState(tasks);
  const diff = useRef(0);

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
    return tasks.map((item, i, arr) => {
      if (currentDate.isBefore(moment(item.date))) {
        item.status = "pending";
      } else if (
        currentDate.isBetween(moment(item.date), moment(arr[i + 1]?.date))
      ) {
        item.status = "active";
        diff.current = moment(currentDate).diff(item.date);
      } else {
        item.status = "done";
      }
      return item;
    });
  }, []);

  // useEffect(() => {
  //   console.log("line 48", diff);
  //   setTask(visitedTimeLine());
  // }, [visitedTimeLine]);

  useEffect(() => {
    console.log("lien 53", diff);
    const timer = setTimeout(() => {
      setTask(visitedTimeLine());
    }, diff.current);
    return () => {
      clearTimeout(timer);
    };
  }, [visitedTimeLine]);

  const displayDate = (date) => {
    return moment(date).format("DD/MM/YYYY hh:mm A");
  };

  return (
    <>
      <Timeline position="alternate">
        {task.map((item) => {
          return (
            <TimelineItem key={item.date + item.activity}>
              <TimelineOppositeContent>
                {displayDate(item.date)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="outlined" />
                <TimelineConnector
                  sx={{ backgroundColor: setStatusColor(item.status) }}
                />
              </TimelineSeparator>
              <TimelineContent>{item.activity}</TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </>
  );
}
