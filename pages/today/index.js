import { Fragment, useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import TodoForm from "../../components/todos/TodoForm";
import TodayTodos from "../../components/todos/TodayTodos";


function TodayPage(props) {
  
  const [editedTask, setEditedTask] = useState(null);
  async function addNewTaskHandler(enteredTask) {
    const response = await fetch("/api/today", {
      method: "POST",
      body: JSON.stringify(enteredTask),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }
  async function taskCompletionHandler(completedTask) {
    completedTask.status = 'completed'; 

 const id = completedTask.id.toString();
    const response = await fetch("/api/completedtask", {
      method: "POST",
      body: JSON.stringify(completedTask),
      headers: {
        "content-type": "application/json",
      },
    });
    if (response.ok) {
      const deleteResponse = await fetch(`/api/deleteTask?id=${id}`, {
        method: "DELETE",
        body: JSON.stringify(completedTask),
      });
  
      if (deleteResponse.ok) {
        console.log("Task completed and deleted successfully.");
      } else {
        console.error("Failed to delete task.");
      }
    } else {
      console.error("Failed to complete task.");
    }
  }
  async function taskDeletedHandler(id){
    
    const deleteResponse = await fetch(`/api/deleteTask?id=${id}`, {
      method: "DELETE",
      
    });

    if (deleteResponse.ok) {
      console.log("Task deleted successfully.");
    } else {
      console.error("Failed to delete task.");
    }
  }
  async function taskEditableHandler(taskToEdit){
setEditedTask(taskToEdit);

  }
  
  useEffect(() => {
    if (editedTask) {
      console.log("Editing task:", editedTask);
    }
  }, [editedTask]);
  async function updateTaskHandler(task) {
    const id = task.id;
    
    const response = await fetch(`/api/editTask?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  
    if (response.ok) {
      console.log('Task updated successfully.');
    } else {
      console.error('Failed to update task.');
    }
  }
  
  return (
    <Fragment>
      <TodayTodos
        todos={props.todos}
        onTaskCompletion={taskCompletionHandler}
        onTaskDelete={taskDeletedHandler}
        onTaskEdit={taskEditableHandler}
      />
      <TodoForm onAddTask={addNewTaskHandler} taskToEdit={editedTask} onUpdateTask={updateTaskHandler}/>
    </Fragment>
  );
}
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://vikassingh9620:vikasSINGH96@cluster0.d4ppp3y.mongodb.net/todos"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");
  const todos = await todosCollection.find().toArray();

  client.close();
  return {
    props: {
      todos: todos.map((todo) => ({
        id: todo._id.toString(),
        task: todo.task,
        description: todo.description,
      })),
    },
    revalidate: 1,
  };
}
export default TodayPage;
