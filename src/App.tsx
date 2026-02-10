import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import './App.css'

function App() {
  return (
    <div className="flex">
      <Sidebar role="admin" />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
