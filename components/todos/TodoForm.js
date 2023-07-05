import { useEffect, useRef, useState } from 'react';

import Card from '../UI/Card';
import classes from './TodoForm.module.css';
import { Button } from '@mui/material';

function TodoForm(props) {
  const taskNameRef = useRef();
  const [editing, setEditing]= useState(false)
  const descriptionInputRef = useRef();
  useEffect(() => {
    
    if (props.taskToEdit) {
      taskNameRef.current.value = props.taskToEdit.task;
      descriptionInputRef.current.value = props.taskToEdit.description;
      setEditing(true)
    }
  }, [props.taskToEdit]);
  function submitHandler(event) {
    event.preventDefault();

    const enteredTaskNameRef = taskNameRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const taskData = {
      task: enteredTaskNameRef,
      description: enteredDescription,
      status: "incomplete"
      
    };

    props.onAddTask(taskData);
    taskNameRef.current.value=''
    descriptionInputRef.current.value=''
  }
function updateTaskHandler() {
  const enteredTaskNameRef = taskNameRef.current.value;
  const enteredDescription = descriptionInputRef.current.value;
  const updatedTaskData = {
    id: props.taskToEdit.id,
    task: enteredTaskNameRef,
    description: enteredDescription,
    
    
  };
  props.onUpdateTask(updatedTaskData);
    taskNameRef.current.value=''
    descriptionInputRef.current.value=''
}
  return (
    <Card>
      <form className={classes.form} >
        <div className={classes.control}>
          <label htmlFor='task'>Task Name</label>
          <input type='text' required id='task' ref={taskNameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
       {!editing ? <button onClick={submitHandler}>Add Task</button>:
          <Button onClick={updateTaskHandler}>update task</Button>}
        </div>
      </form>
    </Card>
  );
}

export default TodoForm;
