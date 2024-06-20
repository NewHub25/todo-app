import React, { useCallback } from 'react';
import { ActionType } from '../types';
import TodoInput from './TodoInput';
import { ACTIONS } from '../logic/constants';

interface Props {
  dispatch: React.Dispatch<ActionType>;
}

const Header: React.FC<Props> = ({ dispatch }) => {
  const addItem = useCallback(
    (title: string) => dispatch({ type: ACTIONS.ADD_ITEM, payload: { title } }),
    [dispatch]
  );

  return (
    <header className='header' data-testid='header'>
      <h1>Todos</h1>
      <TodoInput
        onSubmit={addItem}
        label='New Todo Input'
        placeholder='What needs to be done?'
      />
    </header>
  );
};
export default Header;
