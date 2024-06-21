import React, { useCallback, useMemo } from 'react';
import { type FiltersValueType } from '../consts';
import { ActionType, TodoType } from '../types';
import { Link, useLocation } from 'react-router-dom';
import { ACTIONS } from '../logic/constants';
import { Variants, motion } from 'framer-motion';

interface Props {
  todos: TodoType[];
  dispatch: React.Dispatch<ActionType>;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Footer: React.FC<Props> = ({ todos, dispatch }) => {
  const { pathname } = useLocation();
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
    <motion.footer layout exit='hidden' className='footer' data-testid='footer'>
      <span className='todo-count'>{`${activeTodos.length} ${
        activeTodos.length === 1 ? 'item' : 'items'
      } left!`}</span>
      <ul className='filters' data-testid='footer-navigation'>
        <li>
          <Link className={pathname === '/todo-app/' ? 'selected' : ''} to='/todo-app/'>
            All
          </Link>
        </li>
        <li>
          <Link className={pathname === '/todo-app/active' ? 'selected' : ''} to='/todo-app/active'>
            Active
          </Link>
        </li>
        <li>
          <Link
            className={pathname === '/todo-app/completed' ? 'selected' : ''}
            to='/todo-app/completed'
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
    </motion.footer>
  );
};
export default Footer;
