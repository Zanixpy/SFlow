import { useState } from 'react'
import "./App.css"
import { create } from 'zustand'
import { CreateProject } from './components/CreateProject'


function App() {

  const useStore = create((set) => ({
    projects: [],
    addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  }))

  return <>
      <CreateProject/>
  </>
}

export default App
