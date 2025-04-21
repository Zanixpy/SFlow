import { useState } from "react"
import { CreateProjectDetails } from "../components/create/CreateProjectDetails.jsx"
import { CreateCategorie } from "../components/create/CreateCategorie.jsx"
import { useParams } from "react-router-dom"

export function ProjectDetails() {
    const {id}= useParams()

    return (
        <CreateProjectDetails id={id} />
    )
    
}