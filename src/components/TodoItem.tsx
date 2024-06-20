import React, { memo, useState, useCallback } from 'react';
import { ActionType, TodoType } from '../types';
import TodoInput from './TodoInput';
import { ACTIONS } from '../logic/constants';

interface Props {
  todo: TodoType;
  dispatch: React.Dispatch<ActionType>;
  index: number;
}

const TodoItem = memo<Props>(function Item({ todo, dispatch, index }) {
  const [isWritable, setIsWritable] = useState(false);
  const { title, completed, id } = todo;

  const toggleItem = useCallback(
    () => dispatch({ type: ACTIONS.TOGGLE_ITEM, payload: { id } }),
    [dispatch]
  );
  const removeItem = useCallback(
    () => dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { id } }),
    [dispatch]
  );
  const updateItem = useCallback(
    (id: string, title: string) =>
      dispatch({ type: ACTIONS.UPDATE_ITEM, payload: { id, title} }),
    [dispatch]
  );

  const handleDoubleClick = useCallback(() => {
    setIsWritable(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsWritable(false);
  }, []);

  const handleUpdate = useCallback(
    (title: string) => {
      if (title.length === 0) removeItem();
      else updateItem(id, title);
      setIsWritable(false);
    },
    [id, removeItem, updateItem]
  );

  return (
    <li className={todo.completed ? 'completed' : ''} data-testid='todo-item'>
      <div className='view'>
        {isWritable ? (
          <TodoInput
            onSubmit={handleUpdate}
            label='Edit Todo Input'
            defaultValue={title}
            onBlur={handleBlur}
          />
        ) : (
          <>
            <input
              className='toggle'
              type='checkbox'
              data-testid='todo-item-toggle'
              checked={completed}
              onChange={toggleItem}
            />
            <label
              data-testid='todo-item-label'
              onDoubleClick={handleDoubleClick}
            >
              {title}
            </label>
            <button
              className='destroy'
              data-testid='todo-item-button'
              onClick={removeItem}
            />
          </>
        )}
      </div>
    </li>
  );
});
export default TodoItem;
