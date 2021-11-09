import React, { useState } from 'react';
import { StyleSheet, View, Alert, useColorScheme} from 'react-native';

import { Header } from '../components/Header';
import { ItemWrapper } from '../components/ItemWrapper';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

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
    <View style={isDarkMode ? styles.containerDark : styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#000'
  }
})