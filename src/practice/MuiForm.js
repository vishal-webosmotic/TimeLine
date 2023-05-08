import { Button } from "@mui/material";
import React from "react";

const MuiForm = () => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("hii");
        }}
      >
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default MuiForm;
