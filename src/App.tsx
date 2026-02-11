import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { MOCK_ADMIN } from './mockData/mockData'
import './App.css'

function App() {
  return (
    <div className="flex">
      <Sidebar user={MOCK_ADMIN} />

      <main className="p-[20px]">
        <Outlet />
      </main>
    </div>
  )
}

export default App
