'use client'
import { useState } from "react"

import Topnav from "../components/Topnav"
import Sidenav from "../components/Sidenav"
import MainChatContainer from "../components/MainchatContainer"

import useContextStore from "@/app/lib/contextStore"
import useWindowStore from "@/app/lib/windowStore"
import CodeEditor from "../components/Editor"

export default function MainPage() {
    const context = useContextStore(state => state.context)
    const updateContext = useContextStore(state => state.updateContext)

    const window = useWindowStore(state => state.window)
    const setWindow = useWindowStore(state => state.updateWindow)

    const [i, setI] = useState<number>(context.length > 0 ? 2 : 0);

    return (
    <div className="flex text-slate-400 h-[100vh] bg-zinc-950 font-funnel w-full relative">        
        <Sidenav />

        <div className="flex flex-col w-full h-full relative">
            <Topnav i={i} setI={setI}/>

            {
            window == 'chat' ? 
            <MainChatContainer i={i} setWindow={setWindow} setI={setI}/> : 
            <CodeEditor />
            }

        </div>        
    </div>
    )
}