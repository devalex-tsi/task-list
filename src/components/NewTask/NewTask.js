import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttpCaller from "../../hooks/use-http-caller";

const NewTask = (props) => {
    const {isLoading, error, sendRequest: addTasks} = useHttpCaller()

    const createTaskAction = (taskText, createdTaskData) => {
        const generatedId = createdTaskData.name; // firebase-specific => "name" contains generated id
        const createdTask = {id: generatedId, text: taskText};

        props.onAddTask(createdTask)
    }

    const enterTaskHandler = async (taskText) => {
        addTasks({
                url: 'https://task-list-beb50-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
                method: 'POST',
                body: {text: taskText},
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            createTaskAction.bind(null, taskText))
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading}/>
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
