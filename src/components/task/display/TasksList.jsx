import { Box } from "../../ui/container/Box";
import { CreateBtn } from "../../ui/button/CreateBtn";
import { CreateTask } from "../create/CreateTask";
import { useUserStore } from "../../../store/useUserStore";
import { useState } from "react";

export function TasksList({id}) {
    const allProjects = useUserStore(state=>state.projects)
    const selectedProject = allProjects[id]

    const [showCreateTask, setShowCreateTask] = useState(false)

    return ( <Box w={"340"} h={"150"} >
        <div className="flex items-center">
            <h1 className="mr-5 text-[25px] font-bold">Tasks</h1>
            <CreateBtn OnClick={()=>setShowCreateTask(true)} Value={"+"} className={'text-[20px] border rounded-full px-4 py-2 bg-[#38B2AC] hover:bg-[#2C7A7B] text-white font-bold'} />
        </div>  
    <div className="flex items-center">
    {selectedProject.tasks && selectedProject.tasks.map(item=>
        <CategoriesCircleBox h={"60"} w={"60"} padding="p-10" color={item.color} key={item.id}>
            <div className="text-center max-w-100">
                        <p className="mb-2 text-[30px] font-bold ">{item.name}</p>
                        <div className="flex items-center">
                            <p className="mr-2">Sub-budget :</p>
                            <p className="text-[20px] font-bold" >{item.totalBudget}€</p>
                        </div>
            </div>
        </CategoriesCircleBox>
    )}
    {showCreateTask && <CreateTask id={id} OnClose={()=>setShowCreateTask(false)} />}
    </div>
</Box>)
    
}