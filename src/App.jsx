import { useState } from 'react'
import { NavBar } from './components/NavBar'
import { Struct } from './components/Structure'
import { CTA } from './components/CTA'
import { SignPage } from './components/SignPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./App.css"


function App() {
  return <>
    <SignPage/>
  </>
}

export default App
