import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './components/Auth'
import { Todo } from './components/Todo'
import { getCsrfToken } from './util/fetcher'
import { useQuery } from '@tanstack/react-query'

function App() {
  useQuery({ queryKey: ['csrf'], queryFn: getCsrfToken })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
