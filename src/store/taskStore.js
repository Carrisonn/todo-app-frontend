import { create } from 'zustand'
import { postConfiguration } from '../config/postConfiguration.js'
import { patchConfiguration } from '../config/patchConfiguration.js'

export const useTaskStore = create(set => ({
  tasks: [],
  isLoading: false,
  message: '',
  typeMessage: '',
  editingTask: null,
  setEditingTask: task => set({ editingTask: task }),

  getTasks: async () => {
    set({ isLoading: true })

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      const data = await response.json()
      if (!response.ok) return set({ tasks: [], message: data.errorMessage, typeMessage: 'error' })
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
      if (!response.ok) return set({ message: data.errorMessage, typeMessage: 'error' })
      set(({ tasks }) => ({
        tasks: [...tasks, data.newTask],
        message: data.successMessage,
        typeMessage: 'success'
      }))

      setTimeout(() => {
        set({ message: '' })
      }, 4000)
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },

  editTask: async (taskID, data) => {
    set({ isLoading: true })
    const { PATCH_CONFIG, url } = patchConfiguration(taskID, data)

    try {
      const response = await fetch(url, PATCH_CONFIG)
      const data = await response.json()
      if (!response.ok) return set({ message: data.errorMessage, typeMessage: 'error' })
      set(({ tasks }) => ({
        tasks: tasks.map(task => task.id === data.taskToUpdate.id ? data.taskToUpdate : task),
        message: data.successMessage,
        typeMessage: 'success'
      }))

      setTimeout(() => {
        set({ message: '' })
      }, 4000)
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },

  deleteTask: async taskID => {
    set({ isLoading: true })

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/delete/${taskID}`, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) return set({ message: data.errorMessage, typeMessage: 'error' })
      set(({ tasks }) => ({
        tasks: tasks.filter(task => task.id !== taskID),
        message: data.successMessage,
        typeMessage: 'success'
      }))

      setTimeout(() => {
        set({ message: '' })
      }, 4000)
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },

  toogleTaskStatus: async (taskID, currentStatus) => {
    const newStatus = currentStatus === 'Pendiente' ? 'Completada' : 'Pendiente'
    const { PATCH_CONFIG, url } = patchConfiguration(taskID, { status: newStatus })

    try {
      const response = await fetch(url, PATCH_CONFIG)
      const data = await response.json()
      if (!response.ok) return set({ message: data.errorMessage, typeMessage: 'error' })
      set(({ tasks }) => ({
        tasks: tasks.map(task => task.id === taskID ? { ...task, status: newStatus } : task)
      }))
    } catch (error) {
      console.log(error)
    }
  }
}))