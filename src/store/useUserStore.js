import { useEffect } from 'react'
import { create } from 'zustand'


export const useUserStore = create((set) => ({
    projects: [], 
    removeProject:(project) => set((state) => ({ projects: state.projects.filter((item)=>item.name!==project.name)})),
    addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
    addCategorie: (project,categorie) => set((state) =>{
      const projectIndex = state.projects.findIndex(p => p.id === project.id)
      if (projectIndex === -1) return state

      const updatedProjects = [...state.projects]
      const projectFound = updatedProjects[projectIndex].categories
      projectFound.push(categorie)
      
      return { projects: updatedProjects }
    }),
    removeCategorie: (project,categorie) => set((state)=>{
      const projectIndex = state.projects.findIndex(p => p.id === project.id)
      if (projectIndex === -1) return state

      const updatedProjects = [...state.projects]

      const updatedProject = {...updatedProjects[projectIndex],
        categories: updatedProjects[projectIndex].categories.filter(cat => cat.id !==categorie.id)
      }

      updatedProjects[projectIndex] = updatedProject

      return {projects: updatedProjects}


    }),
    updateProjectBudget: (project) => set((state) => {
      const projectIndex = state.projects.findIndex(p => p.ID === project.ID);
      if (projectIndex === -1) return state
      
      const updatedProjects = [...state.projects]

      const totalCategoriesBudget = project.categories.reduce((sum, category) => sum + parseInt(category.totalBudget), 0)

      const updatedProject = {...updatedProjects[projectIndex],
        spentBudget: totalCategoriesBudget,
        remainingBudget: parseInt(project.totalBudget) - totalCategoriesBudget,
        pourcent: Math.floor((totalCategoriesBudget / parseInt(project.totalBudget)) * 100)
      }

      updatedProjects[projectIndex] = updatedProject
      
      return { projects: updatedProjects }
    }),
    updateCategorieBudget: (project,categorie) => set((state)=>{
        const projectIndex = state.projects.findIndex(p => p.ID === project.ID);
        if (projectIndex === -1) return state
        
        const updatedProjects = [...state.projects]

        const categorieIndex = updatedProjects[projectIndex].categories.findIndex(c=>c.id===categorie.id)
        if (categorieIndex === -1) return state

        const totalTasksBudget = updatedProjects[projectIndex].categories[categorieIndex].tasks.reduce((sum, task) => sum + parseInt(task.totalBudget), 0)

        const updateCategorie= {...updatedProjects[projectIndex].categories[categorieIndex],
          spentBudget:totalTasksBudget,
          remainingBudget: parseInt(categorie.totalBudget) - totalTasksBudget,
          pourcent: Math.floor((totalTasksBudget / parseInt(categorie.totalBudget)) * 100)
        }

        updatedProjects[projectIndex].categories[categorieIndex] = updateCategorie
        
        return { projects: updatedProjects }
    }),
    editValueProject: (project,attribut,value) => set((state)=>{
      const projectIndex = state.projects.findIndex(p => p.id === project.id);
      if (projectIndex === -1) return state

      const updatedProjects = [...state.projects]

      const attributIsHere = Object.keys(updatedProjects[projectIndex]).includes(attribut)
      if (attributIsHere===true) {
          updatedProjects[projectIndex][attribut]= value          
      } else {return state}

      return { projects: updatedProjects }
    }),
    editValueCategorie: (project,categorie,attribut,value) => set((state)=>{
      const projectIndex = state.projects.findIndex(p => p.id === project.id);
      if (projectIndex === -1) return state

      const updatedProjects = [...state.projects]
      const categorieIndex = updatedProjects[projectIndex].categories.findIndex(c=>c.id===categorie.id)



      const attributIsHere = Object.keys(updatedProjects[projectIndex].categories[categorieIndex]).includes(attribut)
      if (attributIsHere===true) {
          updatedProjects[projectIndex].categories[categorieIndex][attribut]= value          
      } else {return state}

      return { projects: updatedProjects }
    }),

    addTask:(project,categorie,task) => set((state)=> {
        const projectIndex = state.projects.findIndex(p => p.id === project.id)
        if (projectIndex === -1) return state

        const updatedProjects = [...state.projects]

        const categorieIndex = updatedProjects[projectIndex].categories.findIndex(c=>c.id===categorie.id)
        const categorieFound = updatedProjects[projectIndex].categories[categorieIndex]
        categorieFound.tasks.push(task)
        console.log(categorieFound)

        return {projects : updatedProjects}
    }),
    removeTask:(project,categorie,task) => set((state)=> {
      const projectIndex = state.projects.findIndex(p => p.id === project.id)
      if (projectIndex === -1) return state

      const updatedProjects = [...state.projects]

      const categorieIndex = updatedProjects[projectIndex].categories.findIndex(c=>c.id===categorie.id)

      const updatedProject = {...updatedProjects[projectIndex].categories[categorieIndex],
        tasks: updatedProjects[projectIndex].categories[categorieIndex].tasks.filter(ts => ts.id !==task.id)
      }

      updatedProjects[projectIndex].categories[categorieIndex] = updatedProject

      return {projects: updatedProjects}

    })
  }))
