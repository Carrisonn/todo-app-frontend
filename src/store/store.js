import { create } from 'zustand'

export const useStore = create(set => ({
  tasks: [],
  isLoading: false,
  message: '',
  editingTask: null,

  setTasks: tasks => set({ tasks }),
  setMessage: message => set({ message }),
  setIsLoading: boolean => set({ isLoading: boolean }),
  setEditingTask: task => set({ editingTask: task }),

  addTaskToStore: newTask => {
    return set(state => ({
      tasks: [...state.tasks, newTask]
    }))
  },

  editTaskFromStore: updatedTask => {
    return set(state => ({
      tasks: state.tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    }))
  },

  deleteTaskFromStore: deletedTask => {
    return set(state => ({
      tasks: state.tasks.filter(task => task.id !== deletedTask.id)
    }))
  },

  editTaskStatusFromStore: (toogleledTask, newStatus) => {
    return set(state => ({
      tasks: state.tasks.map(task => task.id === toogleledTask.id ? { ...task, status: newStatus } : task)
    }))
  }
}))