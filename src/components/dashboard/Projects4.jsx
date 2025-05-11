import { useUserStore } from "../../store/useUserStore";
import { ProjectCard } from "../ui/Projects/ProjectCard";

export function Projects4() {

    const allProjects= useUserStore((state)=>state.projects)
    const lastFourProjects = allProjects.slice(-4)


    return (
        <div>
            <p className="text-[25px] font-bold mb-10">Budget projects</p>
            <ul className="flex justify-between">
                {allProjects.slice(-4).map((item,index)=>
                    <ProjectCard project={item} index={index} />
                )}
            </ul>
        </div>
     );
}
