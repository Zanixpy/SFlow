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


    return <> 
            {ProjectCategorie && ProjectCategorie.map(item=>
                <CircleBoxCate padding="p-6" color={item.Color} className="mx-auto my-10 py-10 bg-gray-50">
                    <div className="text-center">
                                <p>item.Nom</p>
                                <p className="text-[30px]">{DisplayProject[id] && DisplayProject[id].BudgetTotal}€</p>
                                <p className="text-[15px] mt-5" >Budget restant : {DisplayProject[id] && DisplayProject[id].BudgetRestant} </p>
                    </div>
                </CircleBoxCate>
            )}
    </>
}