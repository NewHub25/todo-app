import { ActionType, TodoType } from "../types";
import { ACTIONS, randomId } from "./constants";

const { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM, TOGGLE_ITEM, REMOVE_ALL_ITEMS, TOGGLE_ALL, REMOVE_COMPLETED_ITEMS } = ACTIONS;

export const todoReducer = (state: TodoType[], { type, payload }: ActionType): TodoType[] => {
  switch (type) {
    case ADD_ITEM:
      return [...state, { id: randomId(), title: payload.title!, completed: false }];
    case UPDATE_ITEM:
      return state.map((todo) => (todo.id === payload.id! ? { ...todo, title: payload.title! } : todo));
    case REMOVE_ITEM:
      return state.filter((todo) => todo.id !== payload.id!);
    case TOGGLE_ITEM:
      return state.map((todo) => (todo.id === payload.id! ? { ...todo, completed: !todo.completed } : todo));
    case REMOVE_ALL_ITEMS:
      return [];
    case TOGGLE_ALL:
      return state.map((todo) => (todo.completed !== payload.completed! ? { ...todo, completed: payload.completed! } : todo));
    case REMOVE_COMPLETED_ITEMS:
      return state.filter((todo) => !todo.completed);
  }
  throw Error(`Unknown action: ${type}`);
};