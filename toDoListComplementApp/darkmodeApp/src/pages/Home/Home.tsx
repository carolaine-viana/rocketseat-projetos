import React, { useState } from 'react';
import {      
  Container,
} from './styles';

import { Alert, useColorScheme} from 'react-native';

import { Header } from '../../components/Header/Header';
import { TasksList } from '../../components/TasksList';
import { TodoInput } from '../../components/TodoInput/TodoInput';

export interface TaskData {
  id: number;
  title: string;
  done: boolean;
}

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}
export function Home() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const isDarkMode = useColorScheme() === 'dark';


  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    const foundItem = tasks.find(item => item.title === newTaskTitle)

    if(foundItem){
      return Alert.alert('Você não pode cadastrar uma task com o mesmo nome')
    }
      setTasks([...tasks, data])

    //console.warn(foundItem) < mostra o item
    //motra o vetor todo
    //console.warn(updateTasks) 
    
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({...task}))

    const foundItem = updateTasks.find(item => item.id === id)

    if(!foundItem)
    return;

    foundItem.done = !foundItem.done;
    setTasks(updateTasks)
   
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs){
    const updateTasks = tasks.map(task => ({...task}))

    const foundItem = updateTasks.find(item => item.id === taskId)

    if(!foundItem)
    return;

    //foundItem.title = foundItem.title;
    foundItem.title = taskNewTitle;
    setTasks(updateTasks)

  }

  function handleRemoveTask(id: number) {
    const updateTasks = tasks.filter(task => task.id !== id)

     Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
       {
        text: "Não",
        onPress: () => null
       },
       {
        text: "Sim",
        onPress: () => setTasks(updateTasks),
       }
     ])
         
  };


  return (
    <Container>
      <Header tasksCounter={tasks.length} />

      <TodoInput
        addTask={handleAddTask}
        task={''}
        />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </Container>
  )
}

