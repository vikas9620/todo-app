import { Fragment, useState } from "react";
import Card from "../UI/Card";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import classes from "./TodayTodos.module.css";

function TodayTodos(props) {
  const [selectedTask, setSelectedTask] = useState("");

  const handleRadioChange = (taskId) => {
    setSelectedTask(taskId);
  };

  const options = { weekday: "short", day: "numeric", month: "short" };
  const date = new Date().toLocaleDateString(undefined, options);

  
  const handleCompleteTask = async () => {
    const completedTask = props.todos.find((task) => task.id === selectedTask);
    props.onTaskCompletion(completedTask);
    
  };

  return (
    <Fragment>
      <h2>
        Today <span className={classes.smalldate}>{date}</span>
      </h2>
      <Card>
        {props.todos.map((prevtask) => (
          <Grid container alignItems="center" spacing={2} key={prevtask.id} marginBottom={3} borderBottom={1}>
            <Grid item>
              <Radio
                checked={selectedTask === prevtask.id}
                onChange={() => handleRadioChange(prevtask.id)}
                value={prevtask.id}
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
            </Grid>
            <Grid item marginRight={35}>
              <div>
                <Typography variant="body1">{prevtask.task}</Typography>
                <Typography variant="body2">{prevtask.description}</Typography>
              </div>
            </Grid>
            <Grid item xs={1} sm="auto">
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={handleCompleteTask}
                disabled={!selectedTask || selectedTask !== prevtask.id}
              >
                Completed
              </Button>
            </Grid>
            <Grid item xs={1} sm="auto">
              <Button variant="contained" color="error" size="small" onClick={() => deleteTaskHandler(index)}>
                Delete
              </Button>
            </Grid>
          </Grid>
        ))}
      </Card>
    </Fragment>
  );
}

export default TodayTodos;
