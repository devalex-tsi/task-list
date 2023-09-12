import React, {useEffect, useState} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttpCaller from "./hooks/use-http-caller";

function App() {
    const [tasks, setTasks] = useState([]);

    const transformTasks = taskObject => {
        const loadedTasks = [];

        for (const taskKey in taskObject) {
            loadedTasks.push({id: taskKey, text: taskObject[taskKey].text});
        }

        setTasks(loadedTasks);
    }

    const {isLoading, error, sendRequest: fetchTasks} = useHttpCaller(
        {url: 'https://task-list-beb50-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'},
        transformTasks
    )

    useEffect(() => {
        fetchTasks();
    }, []);

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
