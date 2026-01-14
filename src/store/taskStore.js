import { create } from 'zustand'
import { postConfiguration } from '../config/postConfiguration.js'
import { patchConfiguration } from '../config/patchConfiguration.js'

let messageTimeout

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,
  message: '',
  editingTask: null,
  setEditingTask: task => set({ editingTask: task }),

  getTasks: async () => {
    set({ isLoading: true })

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      const data = await response.json()
      if (!response.ok) return set({ tasks: [], message: data.errorMessage })
      set({ tasks: data.tasks, message: '' })
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },

  createTask: async data => {
    set({ isLoading: true })
    const { POST_CONFIG, url } = postConfiguration(data)

    try {
      const response = await fetch(url, POST_CONFIG)
      const data = await response.json()
      if (!response.ok) return set({ message: data.errorMessage })
      set(({ tasks }) => ({
        tasks: [...tasks, data.newTask],
        message: data.successMessage,
      }))
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }

    get().clearMessageWithDelay()
  },

  editTask: async (taskID, data) => {
    set({ isLoading: true })
    const { PATCH_CONFIG, url } = patchConfiguration(taskID, data)

    try {
      const response = await fetch(url, PATCH_CONFIG)
      const data = await response.json()
      if (!response.ok) return set({ message: data.errorMessage })
      set(({ tasks }) => ({
        tasks: tasks.map(task => task.id === data.taskToUpdate.id ? data.taskToUpdate : task),
        message: data.successMessage,
      }))
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }

    get().clearMessageWithDelay()
  },

  deleteTask: async taskID => {
    set({ isLoading: true })

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/delete/${taskID}`, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) return set({ message: data.errorMessage })
      set(({ tasks }) => ({
        tasks: tasks.filter(task => task.id !== taskID),
        message: data.successMessage,
      }))
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }

    get().clearMessageWithDelay()
  },

  toogleTaskStatus: async (taskID, currentStatus) => {
    const newStatus = currentStatus === 'Pendiente' ? 'Completada' : 'Pendiente'
    const { PATCH_CONFIG, url } = patchConfiguration(taskID, { status: newStatus })

    try {
      const response = await fetch(url, PATCH_CONFIG)
      const data = await response.json()
      if (!response.ok) return set({ message: data.errorMessage })
      set(({ tasks }) => ({
        tasks: tasks.map(task => task.id === taskID ? { ...task, status: newStatus } : task),
        message: currentStatus === 'Pendiente' ? 'Has completado tu objetivo, ¡Enhorabuena! 🎉' : ''
      }))
    } catch (error) {
      console.log(error)
    }

    get().clearMessageWithDelay()
  },

  clearMessageWithDelay: () => {
    if (messageTimeout) clearTimeout(messageTimeout)

    messageTimeout = setTimeout(() => {
      set({ message: '' })
      messageTimeout = null
    }, 1000)
  }
}))