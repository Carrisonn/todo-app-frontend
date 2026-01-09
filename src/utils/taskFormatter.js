export function taskFormatter(tasks, priority) {
  const task = tasks.replace(/^\w/, character => character.toLocaleUpperCase())
  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const creationTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })
  const creation_date = `${day}/${month}/${year} - ${creationTime}`

  return {
    task,
    priority,
    status: 'Pendiente',
    creation_date
  }
}