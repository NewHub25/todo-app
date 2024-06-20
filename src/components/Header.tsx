import React, { useCallback } from 'react';
import { ActionType } from '../types';
import TodoInput from './TodoInput';
import { ACTIONS } from '../logic/constants';
import { motion } from 'framer-motion';

interface Props {
  dispatch: React.Dispatch<ActionType>;
}

const Header: React.FC<Props> = ({ dispatch }) => {
  const addItem = useCallback(
    (title: string) => dispatch({ type: ACTIONS.ADD_ITEM, payload: { title } }),
    [dispatch]
  );

  return (
    <header>
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: 'spring' }}
        className='header'
        data-testid='header'
      >
        Todos
      </motion.h1>
      <TodoInput
        onSubmit={addItem}
        label='New Todo Input'
        placeholder='What needs to be done?'
      />
    </header>
  );
};
export default Header;
