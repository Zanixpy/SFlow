import { Dashboard } from '../pages/Dashboard.jsx'
import { Projects} from '../pages/Projects.jsx'
import { ProjectDetails } from '../pages/ProjectDetails.jsx'
import { Home } from '../pages/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from "../components/layout/Header.jsx"
import { Footer } from '../components/layout/Footer.jsx'


export function AppRoutes() {


    return (
        <BrowserRouter>
        <Header/> 
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/projects' element={<Projects/>} />
                <Route path='/projects/:id' element={<ProjectDetails/>} />
                <Route path='/setting' element={<Dashboard/>} />
            </Routes>
        <Footer/>        
        </BrowserRouter>
    )
    
}