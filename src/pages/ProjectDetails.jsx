import { ProjectInfo } from "../components/project/display/projectInfo.jsx"
import { useParams } from "react-router-dom"

export function ProjectDetails() {
    const {id}= useParams()

    return (
        <ProjectInfo id={id} />
    )
    
}