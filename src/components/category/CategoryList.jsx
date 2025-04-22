import { useUserStore } from "../../store/useUserStore.js"
import { useState } from "react"
import { CreateProject } from "../create/CreateProject.jsx"
import { CreateButton } from "../ui/CreateButton.jsx"
import { Box } from "../ui/Box.jsx"
import { CircleBox } from "../ui/CircleBox.jsx"
import { CircleBoxCate } from "../ui/CircleBoxCate.jsx"

export function CategoryList({id}) {
    const DisplayProject = useUserStore(state=>state.projects)
    const ProjectCategorie= DisplayProject[id].Categories


    return <div className="flex items-center">
            {ProjectCategorie && ProjectCategorie.map(item=>
                <CircleBoxCate h={"50"} w={"50"} padding="p-10" color={item.Color} className="" key={item.ID}>
                    <div className="text-center max-w-100">
                                <p className="mb-2">{item.Nom}</p>
                                <p className="text-[20px]">{item.BudgetTotal}€</p>
                                <p className="text-[15px] mt-5" >Budget restant : {item.BudgetRestant} </p>
                    </div>
                </CircleBoxCate>
            )}
        </div>
        
}