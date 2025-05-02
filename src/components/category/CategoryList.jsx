import { useUserStore } from "../../store/useUserStore.js"
import { useState } from "react"
import { CreateProject } from "../create/CreateProject.jsx"
import { CreateButton } from "../ui/CreateButton.jsx"
import { Box } from "../ui/Box.jsx"
import { CircleBox } from "../ui/CircleBox.jsx"
import { CircleBoxCate } from "../ui/CircleBoxCate.jsx"

export function CategoryList({id}) {
    const allProjects = useUserStore(state=>state.projects)
    const selectedProject = allProjects[id]


    return <div className="flex items-center">
                <h1 className="mr-5 text-[25px] font-bold">Categories</h1>   
            {selectedProject.categories && selectedProject.categories.map(item=>
                <CircleBoxCate h={"60"} w={"60"} padding="p-10" color={item.color} key={item.id}>
                    <div className="text-center max-w-100">
                                <p className="mb-2 text-[40px] font-bold ">{item.name}</p>
                                <div className="flex items-center">
                                    <p className="mr-2">Sub-budget :</p>
                                    <p className="text-[20px] font-bold" >{item.totalBudget}€</p>
                                </div>
                    </div>
                </CircleBoxCate>
            )}
        </div>
        
}