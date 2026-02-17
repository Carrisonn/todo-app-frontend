import { useForm } from '../hooks/useForm.jsx'
import { Toast } from './Toast.jsx'
import styles from './Form.module.css'

export function Form() {
  const {
    inputValue,
    selectValue,
    message,
    handleSubmit,
    handleInputChange,
    handleSelectChange,
    buttonText
  } = useForm()

  return (
    <section >
      {message && <Toast message={message} />}

      <form className={styles.form} onSubmit={handleSubmit} method='POST'>
        <input
          className={styles.input}
          name='task'
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder='Añade tu tarea aquí'
          autoComplete='off'
          required
        />

        <select className={styles.select} onChange={handleSelectChange} value={selectValue} name='priority' required>
          <option value="" defaultChecked hidden>Selecciona una prioridad</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <button className={styles.button} type='submit'>{buttonText}</button>
      </form>
    </section>
  )
}