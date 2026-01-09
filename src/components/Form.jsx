import { useEffect, useId, useState } from 'react'
import { useTaskStore } from '../store/taskStore.js'
import { taskFormatter } from '../utils/taskFormatter.js'
import styles from './Form.module.css'

export function Form() {
  const idInput = useId()
  const idSelect = useId()

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  const createTask = useTaskStore(state => state.createTask)
  const message = useTaskStore(state => state.message)
  const typeMessage = useTaskStore(state => state.typeMessage)
  const editTask = useTaskStore(state => state.editTask)
  const editingTask = useTaskStore(state => state.editingTask)
  const setEditingTask = useTaskStore(state => state.setEditingTask)

  useEffect(() => {
    if (editingTask) {
      setInputValue(editingTask.task)
      setSelectValue(editingTask.priority)
    }
  }, [editingTask])

  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const task = formData.get(idInput).trim()
    const priority = formData.get(idSelect)
    if (!task || !priority) return

    const data = taskFormatter(task, priority)
    editingTask ? editTask(editingTask.id, data) : createTask(data)

    setEditingTask(null)
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

  return (
    <section >
      <form className={styles.form} onSubmit={handleSubmit} method='POST'>
        <input
          className={styles.input}
          name={idInput}
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder='Añade tu tarea aquí'
          autoComplete='off'
          required
        />
        <select className={styles.select} onChange={handleSelectChange} value={selectValue} name={idSelect} required>
          <option value="" defaultChecked hidden>Selecciona una prioridad</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <button className={styles.button} type='submit'>{buttonText}</button>

        {
          message && <p className={`feedback_message ${typeMessage}`}>{message}</p>
        }
      </form>
    </section>
  )
}