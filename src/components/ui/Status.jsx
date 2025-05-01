export function Status({projet,editProject,color,setvalue,status,activity,borderEnable}) {

    const border = borderEnable && `border-b-1 border-gray-300` 

    const handleClick = e => {
        e.stopPropagation()
        const findStatut = status.find(item => item.activity === activity)
        
        setvalue({
            id: findStatut.id,
            activity: findStatut.activity,
            color: findStatut.color,
        })
        
        editProject(projet,"status",findStatut)
        console.log(projet)
    }

    return <div onClick={handleClick} className={`flex items-center p-2 max-w-30 max-h-30 ${border} hover:bg-gray-100 transition-[var(bg-gray-100)] cursor-pointer `}>
                         <div className={`${color} p-1 mr-2 rounded-full border-1`}></div>
                         <p>{activity}</p>
            </div> 

}