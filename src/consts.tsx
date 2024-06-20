export const TODO_FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export const FILTERS_BUTTONS = {
  [TODO_FILTERS.ALL]: {
    literal: "Todos",
    href: `/?filter=${TODO_FILTERS.ALL}`,
  },
  [TODO_FILTERS.ACTIVE]: {
    literal: "Ativos",
    href: `/?filter=${TODO_FILTERS.ACTIVE}`,
  },
  [TODO_FILTERS.COMPLETED]: {
    literal: "Concluídos",
    href: `/?filter=${TODO_FILTERS.COMPLETED}`,
  },
} as const;

export type FiltersValueType = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];