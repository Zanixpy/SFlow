import { useState } from "react";
import { Box } from "../ui/container/Box";
import { ResumeTag } from "./ResumeTag";
import { useUserStore } from "../../store/useUserStore";
import { Projects4 } from "./Projects4";

export function Board() {

    const allProjects = useUserStore((state)=>state.projects)
    const totalGlobalBudget = allProjects.reduce((sum,project)=> sum + parseInt(project.totalBudget),0)
    const totalSpentBudget = allProjects.reduce((sum,project)=> sum + parseInt(project.spentBudget),0)
    const pourcent = Math.floor((totalSpentBudget/totalGlobalBudget)*100)


    const [tag,settag]=useState([
        {criteria:"Active Projects",val:allProjects.length},
        {criteria:"Budget",val:totalGlobalBudget},
        {criteria:"Expenses",val:totalSpentBudget},
        {criteria:"% Used",val:pourcent}
    ])

    return (<Box w={"300"} h={"200"} padding="p-3" margin="mx-30 mt-4 mb-10" className="text-black">
            <header className="text-[35px] font-bold mb-8">Dashboard</header>
            <div className="flex items-center mb-10">
                {tag.map(item=>
                    <ResumeTag name={item.criteria} value={item.val}/>
                )} 
            </div>
            <Projects4/>
    </Box>);
}
