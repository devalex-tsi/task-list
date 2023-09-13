import React, {useEffect, useState} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttpCaller from "./hooks/use-http-caller";

function App() {
    const [tasks, setTasks] = useState([]);

    const {isLoading, error, sendRequest: fetchTasks} = useHttpCaller()

    useEffect(() => {
        const transformTasksAction = taskObject => {
            const loadedTasks = [];

            for (const taskKey in taskObject) {
                loadedTasks.push({id: taskKey, text: taskObject[taskKey].text});
            }

            setTasks(loadedTasks);
        }

        fetchTasks(
            {url: 'https://task-list-beb50-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'},
            transformTasksAction
        );
    }, [fetchTasks]);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler}/>
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    );
}

export default App;
