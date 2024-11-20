'use client'
import Landing from "./components/Landing"
import MainPage from "./env/page"
import { useEffect, useState } from "react"
import useWindowStore from "../lib/windowStore"

export default function Page() {
  const window = useWindowStore(state => state.window)
  const [ page, setPage ] = useState<string | undefined>(undefined)
  
  useEffect(()=>{
    const prevPage = localStorage.getItem('page')
    if (prevPage) {
      setPage(prevPage)
    } else {
      setPage('landing')
      localStorage.setItem('page', 'landing')
    }
  },[])

  return (
    <>
      { page == 'app' ? <MainPage /> : <></> }
      { page == 'landing' ? <Landing setPage={setPage}/> : <></> }
    </>
  )
}