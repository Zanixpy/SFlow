import { useUserStore } from "../../../store/useUserStore.js"


export function CreateStatus({id, Onclose}) {

    const allProjects = useUserStore(state => state.projects)
    const editValue = useUserStore(state => state.editValueProject)
    const selectedProject = allProjects[id]

    const status=[
        {id:"1TD",activity:"To do", color:"bg-gray-400",border:true},
        {id:"2IP", activity:"In Progress", color:"bg-yellow-400",border:true},
        {id:"3D",activity:"Done",color:"bg-green-400",border:false}
    ]

    
    const handleClick = e => {
        e.stopPropagation()
        const idStat = selectedProject.status.id
        const id = e.currentTarget.id
        if (id!==idStat) {
            const findStatut = status.find(item => item.id === id)
            editValue(selectedProject,"status",findStatut)
        } 
        Onclose()
    }

    return (
        <div className="flex items-center">
            <div className="m-8 max-h-30 max-w-100 rounded-lg border-1 border-gray-300 z-2">
                {status && status.map(item =>
                     <div onClick={handleClick} key={item.id} id={item.id} className={`flex items-center p-2 max-w-30 max-h-30 ${item.border && 'border-b-1 border-gray-300'} hover:bg-gray-100 transition-[var(bg-gray-100)] cursor-pointer `}>
                        <div className={`${item.color} p-1 mr-2 rounded-full border-1`}></div>
                        <p>{item.activity}</p>
                     </div>
                )}
            </div>
        </div>
    )
    
}