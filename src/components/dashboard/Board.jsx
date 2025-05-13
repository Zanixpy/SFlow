import { useEffect, useState } from "react";
import { Box } from "../ui/container/Box";
import { ResumeTag } from "./ResumeTag";
import { useUserStore } from "../../store/useUserStore";
import { Projects4 } from "./Projects4";

export function Board() {

    const allProjects = useUserStore((state)=>state.projects)
    const globalBudget = useUserStore((state)=>state.getTotalBudget)
    const globalExpenses = useUserStore((state)=>state.getSpentBudget)
    const pourcent = useUserStore((state)=>state.getPourcent)


    const [tag,settag]=useState([
        {criteria:"Active Projects",val:allProjects.length,key:crypto.randomUUID()},
        {criteria:"Budget",val:globalBudget(),key:crypto.randomUUID()},
        {criteria:"Expenses",val:globalExpenses(),key:crypto.randomUUID()},
        {criteria:"% Used",val:pourcent(),key:crypto.randomUUID()}
    ])

    return (<Box w={"300"} h={"200"} padding="p-3" margin="mx-30 mt-4 mb-10" className="text-black">
            <header className="text-[35px] font-bold mb-8">Dashboard</header>
            <div className="flex items-center mb-10" >
                {tag.map(item=>
                    <ResumeTag name={item.criteria} value={item.val} key={item.key}/>
                )} 
            </div>
            <Projects4/>
    </Box>);
}
