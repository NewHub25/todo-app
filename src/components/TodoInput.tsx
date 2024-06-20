import React, { useCallback } from 'react';
import { sanitize } from '../logic/constants';

interface Props {
  onSubmit: (value: string) => void;
  placeholder?: string;
  label: string;
  defaultValue?: string;
  onBlur?: () => void;
}

const TodoInput: React.FC<Props> = ({
  onSubmit,
  placeholder,
  label,
  defaultValue,
  onBlur,
}) => {
  const handleBlur = useCallback(() => {
    if (onBlur) onBlur();
  }, [onBlur]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const value = e.currentTarget.value.trim();
        if (value.length <= 2) return;
        onSubmit(sanitize(value));
        e.currentTarget.value = '';
      }
    },
    [onSubmit]
  );

  return (
    <div className='input-container'>
      <input
        className='new-todo'
        id='todo-input'
        type='text'
        data-testid='text-input'
        autoFocus
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <label className='visually-hidden' htmlFor='todo-input'>
        {label}
      </label>
    </div>
  );
};
export default TodoInput;
