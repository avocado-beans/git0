import useInputStore from "@/app/lib/inputStore"
import { Tool } from "./Tools"
import { ReactNode } from "react"

export function Topnav(props: {'title': string, 'icon'?: ReactNode, 'className'?: string, 'onClick'?: (...args: any[])=>void}) {
    return(
        <div className="w-fit h-fit text-base font-semibold" onClick={props.onClick}>
            <Tool name={props.title} icon={props.icon} className={props.className}/>
        </div>
    )
}

export default function Navbar() {
    const projectName = useInputStore((state) => (state.input))

    return (
        <div className="text-slate-400 bg-zinc-950 flex justify-between px-4 py-2 font-funnel text-sm">
            <div className="flex items-center gap-2 w-2/5">
                <div className="hover:bg-zinc-900 p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM9 5V19H20V5H9Z"></path></svg>
                </div>
                
                <div className="hover:bg-zinc-900 p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM13 19H18V9.15745L12 3.7029L6 9.15745V19H11V13H13V19Z"></path></svg>
                </div>
                
                <div className="flex gap-2 items-center bg-zinc-900 hover:bg-slate-400 hover:text-black px-2 py-1 rounded-md transition">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12 15V17H18V15H12ZM8.41421 12L5.58579 14.8284L7 16.2426L11.2426 12L7 7.75736L5.58579 9.17157L8.41421 12Z"></path></svg>
                    {projectName}
                </div>
            </div>

            <div className="flex justify-center w-1/5">
                <div className="flex group gap-4 items-center hover:text-teal-500 text-slate-500 text-base px-4 rounded-md transition w-fit border-2 border-zinc-900">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="group-hover:translate-x-1 transition" fill="currentColor"><path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path></svg>
                    <span>Make a PR</span>
                </div>
            </div>

            <div className="flex justify-center w-2/5">
                
            </div>
        </div>
    )
}