import { useRef } from 'react';

import Card from '../UI/Card';
import classes from './TodoForm.module.css';

function TodoForm(props) {
  const taskNameRef = useRef();
  
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTaskNameRef = taskNameRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const taskData = {
      task: enteredTaskNameRef,
      description: enteredDescription,
    };

    props.onAddTask(taskData);
    taskNameRef.current.value=''
    descriptionInputRef.current.value=''
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
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
          <button>Add Task</button>
        </div>
      </form>
    </Card>
  );
}

export default TodoForm;
