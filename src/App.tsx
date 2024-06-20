import React, { useReducer, useState } from 'react';
import Header from './components/Header';
import { todoReducer } from './logic/reducer';
import Footer from './components/Footer';
import MainSection from './components/MainSection';
import { TodoType } from './types';
import useChangeTab from './hooks/useChangeIcon';
import { changeTitle } from './logic/constants';

const MockTodos: TodoType[] = [
  {
    id: '1',
    title: 'Aprender typescript con Midu',
    completed: false,
  },
  {
    id: '2',
    title: 'Aprender a instalar ESLINT',
    completed: false,
  },
  {
    id: '3',
    title: 'Aprender REACT donde sea',
    completed: false,
  },
];

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, MockTodos);
  useChangeTab(todos);
  changeTitle(todos);

  return (
    <div className='todoapp'>
      <Header dispatch={dispatch} />
      <MainSection todos={todos} dispatch={dispatch} />
      <Footer todos={todos} dispatch={dispatch} />
    </div>
  );
};

export default App;
