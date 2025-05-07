import { useParams } from "react-router-dom"
import { ProjectInfo } from "../components/project/display/ProjectInfo"

export function ProjectDetails() {
    const {id}= useParams()

    return (
        <ProjectInfo id={id} />
    )
    
}