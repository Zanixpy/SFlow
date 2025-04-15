import { create } from 'zustand'


export const useStore = create((set) => ({
    projects: [], 
    RemoveProject:(project) => set((state) => ({ projects: state.projects.filter((item)=>item.Nom!==project.Nom)})),
    addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  }))
