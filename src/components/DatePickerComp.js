import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import tasks from "../Json/Task";

const DatePickerComp = () => {
  const [task, setTask] = useState(tasks);

  const [formData, setFormData] = useState({
    date: "",
    activity: "",
    status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, activity } = formData;
    let newDate = moment(date).format("DD/MM/YYYY hh:mm:ss A");

    let ans = tasks
      .map((record) => record.date)
      .map((record) => {
        return moment(record).format("DD/MM/YYYY hh:mm:ss A");
      });

    function isSameDate(element) {
      return element === newDate;
    }

    if (date && activity && !ans.some(isSameDate)) {
      const newItem = {
        date,
        activity,
      };

      setTask((prevData) => {
        const newData = [...prevData, newItem];
        newData.sort((a, b) => moment(a.date) - moment(b.date));
        return newData;
      });
    }
    setFormData({
      date: "",
      activity: "",
    });
  };

  const displayDate = (date) => {
    return moment(date).format("DD/MM/YYYY hh:mm:ss A");
  };

  return (
    <>
      <Stack spacing={2} task={task} setTask={setTask}>
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="DateTime picker"
                value={formData.date ? formData.date : null}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    date: moment(e).utc().format(),
                  });
                }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            label="Activity"
            name="activity"
            value={formData.activity}
            onChange={(e) =>
              setFormData({ ...formData, activity: e.target.value })
            }
          />
          <Button variant="contained" type="submit">
            Add Item
          </Button>
        </form>
        {task.map((item) => {
          return (
            <div key={item.date + item.activity}>
              {displayDate(item.date)}
              <br />
              {item.activity}
            </div>
          );
        })}
      </Stack>
    </>
  );
};

export default DatePickerComp;
