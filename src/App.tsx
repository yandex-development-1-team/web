import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { MOCK_USER } from './mockData/mockData'
import './App.css'

function App() {
  return (
    <div className="flex">
      <Sidebar user={MOCK_USER} />

      <main className="p-[20px] bg-grey-extra-light min-h-screen flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}

export default App
