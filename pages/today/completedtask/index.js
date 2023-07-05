import CompletedTask from "../../../components/todos/CompletedTodos";
import { MongoClient } from "mongodb";

function completedTask(props){
    return <CompletedTask completedTask={props.completedtasks}/>
}

export async function getStaticProps() {
    const client = await MongoClient.connect(
      "mongodb+srv://vikassingh9620:vikasSINGH96@cluster0.d4ppp3y.mongodb.net/completedtasks"
    );
    const db = client.db();
    const todosCollection = db.collection("completedtasks");
    const completedtasks = await todosCollection.find().toArray();
  
    client.close();
    return {
      props: {
        completedtasks: completedtasks.map((completedtask) => ({
          id: completedtask._id.toString(),
          task: completedtask.task,
          description: completedtask.description,
        })),
      },
      revalidate: 1,
    };
  }
export default completedTask