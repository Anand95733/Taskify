/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import InputFeild from './components/InputFeild';
import { Todo } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos,setTodos] = useState<Todo[]>([{id: 1742814640105, isDone: false, todo: "hello"}]);
  const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([])
  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault();
    if(todo){
      setTodos([...todos,{id:Date.now(),todo,isDone:false}]);
      setTodo("")
    }
  };

  const onDragEnd = (result:DropResult) => {
      const {source,destination} = result;
      if(!destination) return;
      if(destination.droppableId === source.droppableId && destination.index === source.index) return;
      
      let add,active = todos,
      complete = CompletedTodos;

      if(source.droppableId === "TodosList"){
        add = active[source.index];
        active.splice(source.index,1);
      }
      else{
        add = complete[source.index];
        complete.splice(source.index,1);
      }
      
      if(destination.droppableId === "TodosList"){
        active.splice(destination.index,0,add);
      }
      else{
        complete.splice(destination.index,0,add);
      }
      setTodos(active);
      setCompletedTodos(complete);
    }

  
  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <span className='heading'>Taskify</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos} completedTodos={CompletedTodos} setCompletedTodos={setCompletedTodos}/>
      
    </div>
  </DragDropContext>
  );
}

export default App;
