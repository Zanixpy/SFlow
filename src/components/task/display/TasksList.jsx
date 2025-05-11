import { Box } from "../../ui/container/Box";
import { CreateBtn } from "../../ui/button/CreateBtn";
import { CreateTask } from "../create/CreateTask";
import { DeleteBtnV2 } from "../../ui/button/DeleteBtnV2";
import { useUserStore } from "../../../store/useUserStore";
import { useState } from "react";

export function TasksList({id,index,categorie=null}) {
    const allProjects = useUserStore(state=>state.projects)
    const removeTask = useUserStore(state=> state.removeTask)
    const selectedProject = allProjects[id]

    const onDelete= async (item) => {
        await new Promise(resolve=>setTimeout(resolve,200))
        removeTask(selectedProject,categorie,item)
    }

    return ( <Box w={"340"} h={"150"} >  
    <div className="flex items-center">
        {selectedProject.tasks && selectedProject.tasks.map(item=>
          <Box h={"40"} w={"280"} padding="px-4 py-3" margin="m-0" className="border border-gray-200 shadow-xs rounded-lg" key={item.id}>
            <div className="flex justify-between items-center mb-5">
                        <input 
                            type="checkbox" 
                            name="" 
                            id="" 
                        />
                        <p>{item.name}</p>
                        <DeleteBtnV2 onClick={onDelete(item)}/>    
            </div>
         </Box>
        )}
        </div>
</Box>)
    
}