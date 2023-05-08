import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

const DatePickerComp = ({ task, setTask }) => {
  const [formData, setFormData] = useState({
    date: "",
    activity: "",
    status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDate = moment(formData.date);

    if (task.some((value) => moment(value.date).isSame(newDate))) {
      console.log("lie");
    } else {
      const { date, activity } = formData;
      const newItem = {
        date,
        activity,
        status: "",
      };
      setTask((prevData) => {
        const newData = [...prevData, newItem];
        newData.sort((a, b) => moment(a.date) - moment(b.date));
        return newData;
      });
      setFormData({
        date: "",
        activity: "",
      });
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          ml: 2,
        }}
      >
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
      </Grid>
    </>
  );
};

export default DatePickerComp;
