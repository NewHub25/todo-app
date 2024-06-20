import { useEffect } from 'react';
import { TodoType } from '../types';

const publicIcons = ['/task.svg', '/check.svg'];

function useChangeTab(todos: TodoType[]) {
  useEffect(() => {
    let iconIndex = 0;

    const interval = setInterval(() => {
      iconIndex = (iconIndex + 1) % publicIcons.length;
      document
        .querySelector('link[rel="icon"]')
        ?.setAttribute('href', publicIcons[iconIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
export default useChangeTab;
