import SLogo from '../../assets/S_logo.png'

export function Footer() {
    return (
        <footer className='bg-gray-20 h-[20px] border-t-gray-200 border-t-1'>       
            <div className="p-5 mx-30">
                <div className="flex items-center justify-between">
                    <div className="">
                            <img src={SLogo} alt=""  className="w-8 mb-10" />   
                        <div className="block">
                            <p>© 2025 SFlow. All rights reserved.</p>
                            </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}