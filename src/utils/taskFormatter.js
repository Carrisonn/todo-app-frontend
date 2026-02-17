export function taskFormatter(task, priority, editingTask) {
  const taskFormatted = task.replace(/^\w/, character => character.toLocaleUpperCase())
  const status = editingTask ? editingTask.status : 'Pendiente'

  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const creationTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })
  const creationDate = `${day}/${month}/${year} - ${creationTime}`

  return {
    task: taskFormatted,
    status,
    priority,
    creation_date: creationDate
  }
}