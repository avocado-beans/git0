'use client'
import { MutableRefObject, useRef } from "react"
import { ExpandIcon, PlusIcon, SettingsIcon, QuestionIcon } from "./Icons"
import useContextStore from "@/app/lib/contextStore"

export default function Sidenav() {
    const newChatRef = useRef<any>()
    const changeKeysRef = useRef<any>()
    const questionRef = useRef<any>()
    const navRef = useRef<any>()
    
    const handleExpand = (ref: MutableRefObject<any>) => {
        ref.current.style.animation = ref.current.style.display == 'none' ? 'fadeOut 1s':'fadeIn 1s'
        ref.current.style.display = ref.current.style.display == 'flex' ? 'flex':'none'
        
        ref.current.style.display = ref.current.style.display == 'none' ? 'flex':'none'
        
        navRef.current.style.width = ref.current.style.display == 'none' ? '40px' : `160px`
    }
    
    const context = useContextStore(state => state.context)
    const updateContext = useContextStore(state => state.updateContext)

    return (
        <div className="hidden md:flex flex-col p-6 gap-4 bg-zinc-900">
            <button className="flex w-fit p-2 hover:bg-zinc-800 rounded-full transition" onClick={()=>{
                handleExpand(newChatRef);
                handleExpand(changeKeysRef);
                handleExpand(questionRef);
            }}>
                <ExpandIcon width={24} height={24}/>
            </button>

            <div className="flex flex-col justify-between overflow-hidden w-[40px] transition-all h-full" ref={navRef}>
                {/* New chat */}
                <div>
                    <button className="flex items-center justify-start gap-2 p-2 group hover:bg-zinc-800 rounded-full transition w-full h-[40px] relative" onClick={()=>{updateContext([]);}}>
                        <PlusIcon width={24} height={24} className="absolute"/>

                        <div className="px-10 font-semibold hidden text-nowrap" ref={newChatRef}>New session</div>
                    </button>
                </div>

                {/* New chat */}
                <div>
                    <button className="flex items-center justify-start gap-2 p-2 group hover:bg-zinc-800 rounded-full transition w-full h-[40px] relative">
                        <SettingsIcon width={24} height={24} className="absolute"/>

                        <div className="px-10 font-semibold hidden text-nowrap" ref={changeKeysRef}>Settings</div>
                    </button>

                    <button className="flex items-center justify-start gap-2 p-2 group hover:bg-zinc-800 rounded-full transition w-full h-[40px] relative">
                        <QuestionIcon width={24} height={24} className="absolute"/>

                        <div className="px-10 font-semibold hidden text-nowrap" ref={questionRef}>How to use</div>
                    </button>
                </div>
            </div>
        </div>
    )
}