import { Button, Stack } from "@mui/material";
import React from "react";

export const button = () => {
  return (
    <div>
      <Stack display="block" spacing={2}>
        <Button variant="contained" size="small">
          Small
        </Button>
        <Button variant="contained" size="medium" style={{ margin: 0 }}>
          Small
        </Button>
        <Button variant="contained" size="large">
          Small
        </Button>
      </Stack>
    </div>
  );
};

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

/* <Typography variant="h3">pqr</Typography>
      <Typography variant="h3" component="h1">
        hii
      </Typography> */

/* <Stack spacing={2} direction="row">
        <Button variant="contained" size="small">
          Small
        </Button>
        <Button variant="contained" size="small">
          Small
        </Button>
        <Button variant="contained" size="small">
          Small
        </Button>
      </Stack>
      */

/* <Divider component="div" role="presentation">
        <Typography variant="h2">My Heading</Typography>
      </Divider>
      <Typography>xyz</Typography> */
/* <ButtonGroup orientation="vertical" color="primary" variant="contained">
        <Button>hii</Button>
        <Button variant="text">hii</Button>

        <Button variant="outlined" startIcon={<DeleteForever />}>
          seth
        </Button>
      </ButtonGroup>

      <h3>CheckBox</h3>
      <Checkbox {...label} default Checked />
      <Checkbox {...label} />
      <Checkbox {...label} disabled />
      <Checkbox {...label} disabled checked /> */
