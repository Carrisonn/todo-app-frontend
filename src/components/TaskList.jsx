import { useEffect } from 'react'
import { useStore } from '../store/store.js'
import { useOrder } from '../hooks/useOrder.jsx'
import { TaskCard } from './TaskCard.jsx'
import styles from './TaskList.module.css'
import { useTaskAPI } from '../hooks/useTaskAPI.jsx'

export function TaskList() {
  const tasks = useStore(state => state.tasks)
  const isLoading = useStore(state => state.isLoading)

  const { sortedTasks } = useOrder(tasks)
  const { getTasks } = useTaskAPI()

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <section className={styles.task_list}>
      {
        isLoading
          ? <div className={styles.loader}></div>
          : sortedTasks.map(task => <TaskCard key={task.id} task={task} />)
      }
    </section>
  )
}