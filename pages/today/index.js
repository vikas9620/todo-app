import { Fragment } from "react";
import { MongoClient } from "mongodb";
import TodoForm from "../../components/todos/TodoForm";
import TodayTodos from "../../components/todos/TodayTodos";

function TodayPage(props) {
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
    const response = await fetch("/api/completedtask", {
      method: "POST",
      body: JSON.stringify(completedTask),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <Fragment>
      <TodayTodos
        todos={props.todos}
        onTaskCompletion={taskCompletionHandler}
      />
      <TodoForm onAddTask={addNewTaskHandler} />
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
