import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DashboardPage } from './components/pages/DashboardPage'
import { ProjectsPage } from './components/pages/ProjectsPage'
import { ProjectDetailsPage } from './components/pages/ProjectDetailsPage'

const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage />,
        children: [
            {
                path: "/",
                element: <div>Bienvenue sur le Dashboard</div>
            },
            {
                path: "/projects",
                element: <ProjectsPage/>,
            },
            {
                        path:"/projects/:id",
                        element: <ProjectDetailsPage/>
            }
            
        ]
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App
