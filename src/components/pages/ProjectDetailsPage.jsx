import { useState } from "react"
import { CreateProjectDetails } from "../create/CreateProjectDetails.jsx"
import { useParams } from "react-router-dom"

export function ProjectDetailsPage() {
    const {id}= useParams()

    return (
       <CreateProjectDetails id={id} />
    )
}