import { useStore } from '../store/store.js'
import { useTaskAPI } from '../hooks/useTaskAPI.jsx'
import { Toast } from './Toast.jsx'
import styles from './TaskCard.module.css'

export function TaskCard({ task }) {
  const setEditingTask = useStore(state => state.setEditingTask)
  const message = useStore(state => state.message)

  const { deleteTask, toogleTaskStatus } = useTaskAPI()

  const handleDeleteTask = id => {
    if (!id) return
    deleteTask(id)
  }

  const handleEditingTask = task => {
    if (!task) return
    setEditingTask(task)
  }

  return (
    <>
      {message && <Toast message={message} />}

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
      </div>
    </>
  )
}