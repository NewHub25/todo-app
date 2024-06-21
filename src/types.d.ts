export interface TodoType {
  id: string;
  title: string;
  completed: boolean;
}
export type ActionType = {
  type: Symbol;
  payload: Partial<TodoType>;
} | {
  type: Symbol;
  payload: TodoType[];
};

export type ListOfTodos = Array<TodoType>;
export type TodoId = Pick<TodoType, 'id'>
export type TodoTitle = Pick<TodoType, 'title'>