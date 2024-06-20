import React, { useCallback, useMemo } from 'react';
import { type FiltersValueType } from '../consts';
import { ActionType, TodoType } from '../types';
import { Link, useLocation } from 'react-router-dom';
import { ACTIONS } from '../logic/constants';

interface Props {
  todos: TodoType[];
  dispatch: React.Dispatch<ActionType>;
}

const Footer: React.FC<Props> = ({ todos, dispatch }) => {
  const { pathname: route } = useLocation();
  const activeTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );
  const removeCompleted = useCallback(
    () => dispatch({ type: ACTIONS.REMOVE_COMPLETED_ITEMS, payload: {} }),
    [dispatch]
  );

  // prettier-ignore
  if (todos.length === 0) return null;
  return (
    <footer className='footer' data-testid='footer'>
      <span className='todo-count'>{`${activeTodos.length} ${
        activeTodos.length === 1 ? 'item' : 'items'
      } left!`}</span>
      <ul className='filters' data-testid='footer-navigation'>
        <li>
          <Link className={route === '/' ? 'selected' : ''} to='/'>
            All
          </Link>
        </li>
        <li>
          <Link className={route === '/active' ? 'selected' : ''} to='/active'>
            Active
          </Link>
        </li>
        <li>
          <Link
            className={route === '/completed' ? 'selected' : ''}
            to='/completed'
          >
            Completed
          </Link>
        </li>
      </ul>
      <button
        className='clear-completed'
        disabled={activeTodos.length === todos.length}
        onClick={removeCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
export default Footer;
