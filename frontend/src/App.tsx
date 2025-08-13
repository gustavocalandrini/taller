import { useState } from 'react';
import './App.css'
import api from './config/api';

function App() {

  const [tasks, setTasks] = useState(null);

  api.get('http://localhost:8080/api/tasks/', {
    params: {}
  })
    .then(function (response) {
      setTasks(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  const renderTasks = () => {
    if (!tasks) return <p>Loading tasks...</p>;
    return tasks.map((task: any) => (
      <div key={task.id}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
    ));
  };

  return (
    <>
      {renderTasks()}
    </>
  )
}

export default App
