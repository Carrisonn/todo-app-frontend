import { useStore } from '../store/store.js'
import { config } from '../config/config.js'

export function useTaskAPI() {
  const setTasks = useStore(state => state.setTasks)
  const addTaskToStore = useStore(state => state.addTaskToStore)
  const editTaskFromStore = useStore(state => state.editTaskFromStore)
  const deleteTaskFromStore = useStore(state => state.deleteTaskFromStore)
  const editTaskStatusFromStore = useStore(state => state.editTaskStatusFromStore)
  const setMessage = useStore(state => state.setMessage)
  const setIsLoading = useStore(state => state.setIsLoading)

  const getTasks = async () => {
    setIsLoading(true)
    const API_URL = `${import.meta.env.VITE_API_URL}/tasks`

    try {
      const response = await fetch(API_URL)
      const { tasks, message } = await response.json()
      if (!response.ok) return setMessage(message)

      setTasks(tasks)
      setMessage('')
    } catch (error) {
      // console.log(error)
      setMessage('Hubo un error al obtener las tareas, por favor vuelva mas tarde')
    } finally {
      setIsLoading(false)
    }
  }

  const createTask = async data => {
    setIsLoading(true)
    const { API_URL, CONFIG } = config(null, data, 'POST')

    try {
      const response = await fetch(API_URL, CONFIG)
      const { task, message } = await response.json()
      if (!response.ok) return setMessage(message)

      addTaskToStore(task)
      setMessage(message)
    } catch (error) {
      // console.log(error)
      setMessage('Hubo un error al crear la tarea, por favor vuelva mas tarde')
    } finally {
      setIsLoading(false)
    }
  }

  const editTask = async (id, data) => {
    setIsLoading(true)
    const { API_URL, CONFIG } = config(id, data, 'PUT')

    try {
      const response = await fetch(API_URL, CONFIG)
      const { task, message } = await response.json()
      if (!response.ok) return setMessage(message)

      editTaskFromStore(task)
      setMessage(message)
    } catch (error) {
      // console.log(error)
      setMessage('Hubo un error al editar la tarea, por favor vuelva mas tarde')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTask = async id => {
    setIsLoading(true)
    const API_URL = `${import.meta.env.VITE_API_URL}/tasks/${id}`

    try {
      const response = await fetch(API_URL, { method: 'DELETE' })
      const { task, message } = await response.json()
      if (!response.ok) return setMessage(message)

      deleteTaskFromStore(task)
      setMessage(message)
    } catch (error) {
      // console.log(error)
      setMessage('Hubo un error al borrar la tarea, por favor vuelva mas tarde')
    } finally {
      setIsLoading(false)
    }
  }

  const toogleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pendiente' ? 'Completada' : 'Pendiente'
    const feedbackMessage = currentStatus === 'Pendiente' ? 'Has completado tu objetivo, ¡Enhorabuena! 🎉' : ''
    const { API_URL, CONFIG } = config(id, { status: newStatus }, 'PATCH')

    try {
      const response = await fetch(API_URL, CONFIG)
      const { task, message } = await response.json()
      if (!response.ok) setMessage(message)

      editTaskStatusFromStore(task, newStatus)
      setMessage(feedbackMessage)
    } catch (error) {
      // console.log(error)
      setMessage('Hubo un error al actualizar el estado de la tarea, por favor vuelva mas tarde')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getTasks,
    createTask,
    editTask,
    deleteTask,
    toogleTaskStatus
  }
}