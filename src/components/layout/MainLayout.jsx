import { Header } from "./Header"
import { Footer } from "./Footer"
import { Children } from "react"

export function MainLayout({children}) {

    return (
        <>
            <Header/>
            {Children}
            <Footer/>
        </>

    )
    
}