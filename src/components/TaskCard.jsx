import styles from './TaskCard.module.css'
import { useTaskStore } from '../store/taskStore.js'
import { Toast } from './Toast.jsx'

export function TaskCard({ task }) {
  const deleteTask = useTaskStore(state => state.deleteTask)
  const toogleTaskStatus = useTaskStore(state => state.toogleTaskStatus)
  const setEditingTask = useTaskStore(state => state.setEditingTask)
  const message = useTaskStore(state => state.message)

  const handleDeleteTask = taskID => {
    if (!taskID) return
    deleteTask(taskID)
  }

  const handleEditingTask = task => {
    if (!task) return
    setEditingTask(task)
  }

  return (
    <div className={styles.task_card}>
      <p className={styles.task_name}><span>{task.task}</span></p>
      <p className={styles.task_priority}>Prioridad: <span>{task.priority}</span></p>
      <div className={styles.state_wrapper}>
        <label htmlFor="checkbox">
          <p>Estado: <span>{task.status}</span></p>
          <input
            checked={task?.status === 'Completada'}
            onChange={() => toogleTaskStatus(task.id, task.status)}
            type="checkbox"
            id='checkbox'
          />
        </label>
      </div>
      <div className={styles.buttons_wrapper}>
        <button className={styles.delete_button} onClick={() => handleDeleteTask(task.id)}>Borrar</button>
        <button className={styles.edit_button} onClick={() => handleEditingTask(task)}>Editar</button>
      </div>
      <p className={styles.creation_date}>{task.creation_date}</p>

      {
        message && <Toast message={message} />
      }
    </div>
  )
}