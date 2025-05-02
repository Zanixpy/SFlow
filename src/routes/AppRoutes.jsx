import { Dashboard } from '../pages/Dashboard.jsx'
import { Projects} from '../pages/Projects.jsx'
import { ProjectDetails } from '../pages/ProjectDetails.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from "../components/layout/Header.jsx"
import { Footer } from '../components/layout/Footer.jsx'
import { NotFound } from "../pages/NotFound.jsx";


export function AppRoutes() {


    return (
        <BrowserRouter>
        <Header/> 
            <Routes>
                <Route path='/' element={<Dashboard/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/projects' element={<Projects/>} />
                <Route path='/projects/:id' element={<ProjectDetails/>} />
                <Route path='/setting' element={<Dashboard/>} />
                <Route path='/notFound' element={<NotFound/>} />
            </Routes>
        <Footer/>        
        </BrowserRouter>
    )
    
}