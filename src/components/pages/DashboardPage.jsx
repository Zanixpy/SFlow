import { NavBar } from "../layout/Navbar"
import { Outlet } from 'react-router-dom'

export function DashboardPage() {
   return (
        <div className="flex">
            <NavBar/>
            <main className="ml-64 flex-1 p-4">
                <Outlet/>
            </main>
        </div>
    )
}