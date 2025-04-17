import { Dashboard } from '../pages/Dashboard'
import { Projects} from '../pages/Projects'
import { ProjectDetails } from '../pages/ProjectDetails'
import { Home } from '../pages/Home.Jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from "../components/layout/Navbar.jsx"


export function AppRoutes() {


    return (
        <BrowserRouter>
        <NavBar/> 
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/projects' element={<Projects/>} />
            <Route path='/projects/:id' element={<ProjectDetails/>} />
            <Route path='/setting' element={<Dashboard/>} />

        </Routes>        
        </BrowserRouter>
    )
    
}