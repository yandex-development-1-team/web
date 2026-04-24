import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import './App.css'

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-[20px] bg-grey-extra-light min-h-screen flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}

export default App
