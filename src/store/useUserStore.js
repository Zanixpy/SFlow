import { create } from 'zustand'


export const useUserStore = create((set) => ({
    projects: [], 
    removeProject:(project) => set((state) => ({ projects: state.projects.filter((item)=>item.name!==project.name)})),
    addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
    addCategorie: (project,categorie) => set((state) =>{
      const projectIndex = state.projects.findIndex(p => p.id === project.id)
      if (projectIndex === -1) return state

      const updatedProjects = [...state.projects]
      updatedProjects[projectIndex].categories.push(categorie)
      
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
      updatedProjects[projectIndex].spentBudget = totalCategoriesBudget
      updatedProjects[projectIndex].remainingBudget = parseInt(project.totalBudget) - totalCategoriesBudget
      
      return { projects: updatedProjects }
    }),
    editValue: (project,attribut,value) => set((state)=>{
      const projectIndex = state.projects.findIndex(p => p.id === project.id);
      if (projectIndex === -1) return state

      const updatedProjects = [...state.projects]

      const attributIsHere = Object.keys(updatedProjects[projectIndex]).includes(attribut)
      if (attributIsHere===true) {
          updatedProjects[projectIndex][attribut]= value          
      } else {return state}

      return { projects: updatedProjects }
    })
  }))
