import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'

export function NavBar() {
    return (
        <header className='fixed left-0 top-0 right-0 bg-white h-20 border-1 border-gray-200'>
            <div className='p-2 mx-30'>
                <nav className="flex items-center p-4">
                        <div className='flex-1'>          
                        <Link to="/">
                            <img src={Logo} alt="Logo asso" className='w-18 h-8' />
                        </Link>
                        </div>
                        <div className='flex-2 space-x-6'>
                            <Link to="/home" className=" hover:text-gray-300">
                                Home
                            </Link>      
                            <Link to="/dashboard" className=" hover:text-gray-300">
                                Dashboard
                            </Link>
                            <Link to="/projects" className="hover:text-gray-300">
                                Projets
                            </Link>
                            <Link to="/setting" className="hover:text-gray-300">
                                Setting
                            </Link>
                        </div>
                </nav>
            </div>
        </header>
    )
} 