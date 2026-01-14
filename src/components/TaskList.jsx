import { useEffect } from 'react'
import { useTaskStore } from '../store/taskStore.js'
import { useOrder } from '../../hooks/useOrder.jsx'
import { TaskCard } from './TaskCard.jsx'
import styles from './TaskList.module.css'

export function TaskList() {
  const tasks = useTaskStore(state => state.tasks)
  const getTasks = useTaskStore(state => state.getTasks)
  const isLoading = useTaskStore(state => state.isLoading)
  const orderedTasks = useOrder(tasks)

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <section className={styles.task_list}>
      {
        isLoading
          ? <div className={styles.loader}></div>
          : orderedTasks.map(task => <TaskCard key={task.id} task={task} />)
      }
    </section>
  )
}