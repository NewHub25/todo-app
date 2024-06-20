export const ACTIONS = Object.freeze({
  ADD_ITEM: Symbol(),
  UPDATE_ITEM: Symbol(),
  REMOVE_ITEM: Symbol(),
  TOGGLE_ITEM: Symbol(),
  REMOVE_ALL_ITEMS: Symbol(),
  TOGGLE_ALL: Symbol(),
  REMOVE_COMPLETED_ITEMS: Symbol(),
});

export const stringsToCatch =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

export const randomId = (size = 20) => {
  let id = '';
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  let i = size + 1;
  while (i--) {
    // `| 0` is more compact and faster than `Math.floor()`.
    id += stringsToCatch[(Math.random() * 64) | 0];
  }
  return id;
};

export const sanitize = (string = '') => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
};
export const changeTitle = (todos) => {
  if (Array.isArray(todos)) {
    const { length } = todos;
    document.title = `${length || ''} task${length > 1 ? 's' : ''}`;
  } else {
    throw TypeError('Invalid value in changeTitle function');
  }
};
