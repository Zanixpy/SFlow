import { create } from 'zustand'


export const useStore = create((set) => ({
    projects: [],
    addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  }))
