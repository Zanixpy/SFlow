import { create } from 'zustand'


export const useUserStore = create((set) => ({
    projects: [], 
    RemoveProject:(project) => set((state) => ({ projects: state.projects.filter((item)=>item.Nom!==project.Nom)})),
    addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
    UpdateProjectBudget: (project) => set((state) => {
      const projectIndex = state.projects.findIndex(p => p.ID === project.ID);
      if (projectIndex === -1) return state
      
      const updatedProjects = [...state.projects]
      const totalCategoriesBudget = project.Categories.reduce((sum, category) => sum + parseInt(category.BudgetTotal), 0)
      updatedProjects[projectIndex].BudgetRestant = parseInt(project.BudgetTotal) - totalCategoriesBudget
      
      return { projects: updatedProjects }
    }),
    EditProjectValue: (project,attribut,value) => set((state)=>{
      const projectIndex = state.projects.findIndex(p => p.ID === project.ID);
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
