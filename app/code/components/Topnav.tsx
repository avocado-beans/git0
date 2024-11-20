import { GithubIcon, LeftArrow, RightArrow } from "./Icons"
import WindowHandler from "./HandleWindows"
import { Tool } from "../components/Tools"
import useContextStore from "@/app/lib/contextStore"
import useWindowStore from "@/app/lib/windowStore"

export default function Topnav(props: {'i': number, 'setI': (i: number)=>void}) {
    const window = useWindowStore(state => state.window)
    const context = useContextStore(state => state.context)

    return (
        <div className='w-full absolute px-4'>
            <div className="flex justify-between items-end relative h-12">
                    <WindowHandler />

                    {/* Nav */}
                    <div className={`${window != 'chat' ? 'hidden' : ''} absolute bottom-0 left-1/2 right-1/2 flex flex-col justify-center items-center`}>

                        <div className="flex justify-center items-center gap-6 *:border-2 *:border-zinc-900 *:p-1 *:rounded-full rounded-full z-[999] bg-zinc-950">
                            <Tool name='' onClick={()=>{props.i < context.length-1 ? props.setI(props.i+2) : {}}} className="hover:bg-zinc-800" icon={<LeftArrow width={24} height={24}/>}/>
                            {props.i > 1 && context.length >= props.i ? (context.length - props.i)/2+1 : 0}
                            <Tool name='' onClick={()=>{props.i/2 >= 2? props.setI(props.i-2) : {}}} className="hover:bg-zinc-800" icon={<RightArrow width={24} height={24}/>}/>
                        </div>
                        
                    </div>

                    {/* Pull to repo button */}
                    <Tool name='Make a PR' className="hidden md:flex gap-4 py-2 px-4 border-2 border-zinc-900 rounded-xl hover:text-black hover:bg-teal-500" icon={<GithubIcon width={24} height={24}/>}></Tool>   
                </div>
                <div className="w-full bg-gradient-to-b sticky top-0 from-zinc-950 to-transparent h-10"></div>
        </div>
    )
}