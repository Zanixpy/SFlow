import { Outlet } from "react-router-dom";


export function Box({h, w, children}) {

    return (
        <div className="flex items-center">
            <div className={`m-8 p-10 max-h-${h} w-${w} rounded-sm border-1`}>
                {children}
            </div>
        </div>
    )
    
}