import { Header } from './components/Header.jsx'
import { Form } from './components/Form.jsx'
import { TaskList } from './components/TaskList.jsx'
import { Footer } from './components/Footer.jsx'

function App() {

  return (
    <div className='container'>
      <Header />
      <main>
        <Form />
        <TaskList />
      </main>
      <Footer />
    </div>
  )
}

export default App
