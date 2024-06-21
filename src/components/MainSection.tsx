import React, { useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import TodoItem from './TodoItem';
import { ActionType, TodoType } from '../types';
import { ACTIONS } from '../logic/constants';
import { AnimatePresence, Reorder } from 'framer-motion';

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

  const newOrderTodos = useCallback(
    (todos: TodoType[]) =>
      dispatch({
        type: ACTIONS.SET_TODOS,
        payload: [...todos],
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
      <Reorder.Group
        axis='y'
        values={todos}
        onReorder={pathname === '/' ? newOrderTodos : () => {}}
        className='todo-list'
        data-testid='todo-list'
      >
        <AnimatePresence>
          {visibleTodos.map((todo, index) => (
            <Reorder.Item key={todo.id} value={todo}>
              <TodoItem todo={todo} dispatch={dispatch} index={index} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </main>
  );
};
export default MainSection;
