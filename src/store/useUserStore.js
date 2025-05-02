import { create } from 'zustand'


export const useUserStore = create((set) => ({
    projects: [], 
    removeProject:(project) => set((state) => ({ projects: state.projects.filter((item)=>item.Nom!==project.Nom)})),
    addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
    updateProjectBudget: (project) => set((state) => {
      const projectIndex = state.projects.findIndex(p => p.ID === project.ID);
      if (projectIndex === -1) return state
      
      const updatedProjects = [...state.projects]
      const totalCategoriesBudget = project.Categories.reduce((sum, category) => sum + parseInt(category.BudgetTotal), 0)
      updatedProjects[projectIndex].BudgetRestant = parseInt(project.BudgetTotal) - totalCategoriesBudget
      
      return { projects: updatedProjects }
    }),
    editValue: (project,attribut,value) => set((state)=>{
      console.log(project)
      const projectIndex = state.projects.findIndex(p => p.id === project.id);
      if (projectIndex === -1) return state
      const updatedProjects = [...state.projects]

      const attributIsHere = Object.keys(updatedProjects[projectIndex]).includes(attribut)
      if (attributIsHere===true) {
          console.log("Yes attribut is here")
          updatedProjects[projectIndex][attribut]= value          
      } else {return state}

      return { projects: updatedProjects }
    })
  }))
