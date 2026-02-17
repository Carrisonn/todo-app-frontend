import { useEffect, useState } from 'react'
import { useStore } from '../store/store.js'
import { taskFormatter } from '../utils/taskFormatter.js'
import { useTaskAPI } from './useTaskAPI.jsx'

export function useForm() {
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  const editingTask = useStore(state => state.editingTask)
  const setEditingTask = useStore(state => state.setEditingTask)
  const setMessage = useStore(state => state.setMessage)
  const message = useStore(state => state.message)

  const { createTask, editTask } = useTaskAPI()

  useEffect(() => {
    if (editingTask) {
      setInputValue(editingTask.task)
      setSelectValue(editingTask.priority)
    }
  }, [editingTask])

  const handleSubmit = event => {
    event.preventDefault()

    const task = inputValue.trim()
    const priority = selectValue
    if (!task || !priority) return

    const data = taskFormatter(task, priority, editingTask)
    editingTask ? editTask(editingTask.id, data) : createTask(data)

    setEditingTask(null)
    setMessage('')
    setInputValue('')
    setSelectValue('')
  }

  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  const handleSelectChange = event => {
    setSelectValue(event.target.value)
  }

  const buttonText = editingTask ? 'Guardar cambios' : 'Agregar tarea'

  return {
    inputValue,
    selectValue,
    message,
    handleSubmit,
    handleInputChange,
    handleSelectChange,
    buttonText
  }
}