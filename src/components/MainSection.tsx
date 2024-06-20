import React, { useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import TodoItem from './TodoItem';
import { ActionType, TodoType } from '../types';
import { ACTIONS } from '../logic/constants';
import { AnimatePresence } from 'framer-motion';

interface MainSectionProps {
  todos: TodoType[];
  dispatch: React.Dispatch<ActionType>;
}

const MainSection: React.FC<MainSectionProps> = ({ todos, dispatch }) => {
  const { pathname } = useLocation();

  const visibleTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (pathname === '/active') return !todo.completed;
        if (pathname === '/completed') return todo.completed;
        return todo;
      }),
    [todos, pathname]
  );

  const toggleAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: ACTIONS.TOGGLE_ALL,
        payload: { completed: e.target.checked },
      }),
    [dispatch]
  );

  return (
    <main className='main' data-testid='main'>
      {visibleTodos.length > 0 ? (
        <div className='toggle-all-container'>
          <input
            className='toggle-all'
            type='checkbox'
            data-testid='toggle-all'
            checked={visibleTodos.every((todo) => todo.completed)}
            onChange={toggleAll}
          />
          <label className='toggle-all-label' htmlFor='toggle-all'>
            Toggle All Input
          </label>
        </div>
      ) : null}
      <ul className='todo-list' data-testid='todo-list'>
        <AnimatePresence>
          {visibleTodos.map((todo, index) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              dispatch={dispatch}
              index={index}
            />
          ))}
        </AnimatePresence>
      </ul>
    </main>
  );
};
export default MainSection;
