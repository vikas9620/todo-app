import { Fragment, useState } from "react";
import Card from "../UI/Card";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import classes from "./TodayTodos.module.css";

function TodayTodos(props) {
  const [selectedTask, setSelectedTask] = useState("");
  const [tasks, setTasks] = useState(props.todos);

  const handleRadioChange = (taskId) => {
    setSelectedTask(taskId);
  };

  const options = { weekday: "short", day: "numeric", month: "short" };
  const date = new Date().toLocaleDateString(undefined, options);

  const handleCompleteTask = async () => {
    const completedTask = props.todos.find((task) => task.id === selectedTask);
    props.onTaskCompletion(completedTask);
    const updatedTasks = tasks.filter((todo) => todo.id !== selectedTask);
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    props.onTaskEdit(taskToEdit);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((todo) => todo.id !== selectedTask);
    setTasks(updatedTasks);
    props.onTaskDelete(taskId);
  };

  return (
    <Fragment>
      <h2>
        Today <span className={classes.smalldate}>{date}</span>
      </h2>
      <Card>
        {tasks.map((prevtask) => (
          <Grid
            container
            alignItems="center"
            key={prevtask.id}
            marginBottom={3}
            borderBottom={1}
            justifyContent="space-between"
          >
            <Grid item display="flex" flexDirection="row">
              <div>
                <Radio
                  checked={selectedTask === prevtask.id}
                  onChange={() => handleRadioChange(prevtask.id)}
                  value={prevtask.id}
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
              </div>
              <div>
                <Typography variant="body1">{prevtask.task}</Typography>
                <Typography variant="body2">{prevtask.description}</Typography>
              </div>
            </Grid>
            <Grid item xs={1} sm="auto">
              <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                color="success"
                size="small"
                onClick={handleCompleteTask}
                disabled={!selectedTask || selectedTask !== prevtask.id}
              >
                Completed
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleEditTask(prevtask.id)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDeleteTask(prevtask.id)}
              >
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
