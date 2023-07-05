import { Fragment } from "react";
import Card from "../UI/Card";

import Grid from "@mui/material/Grid";

import { Typography } from "@mui/material";


function CompletedTask(props){



    return  <Fragment>
    <h2>
      completedTask
    </h2>
    <Card>
      {props.completedTask.map((prevtask) => (
        <Grid container alignItems="center"  key={prevtask.id} marginBottom={3} borderBottom={1} justifyContent={"space-between"}>
          <Grid item  >
          
              <Typography variant="body1">Task Name: {prevtask.task}</Typography>
              </Grid>
              <Grid item >
          <Typography variant="body1">{prevtask.description}</Typography>
          </Grid></Grid>
      ))}
    </Card>
  </Fragment>
}
export default CompletedTask;