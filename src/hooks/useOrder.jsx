import { useMemo } from 'react'

const PRIORITY_ORDER = {
  'Alta': 0,
  'Media': 1,
  'Baja': 2
}

export function useOrder(tasks) {
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((obj1, obj2) => PRIORITY_ORDER[obj1.priority] - PRIORITY_ORDER[obj2.priority])
  }, [tasks])

  return { sortedTasks }
}