import { ChatIcon, CodeIcon } from "./Icons"
import { Topnav } from "./Navbar"
import useWindowStore from "@/app/lib/windowStore"

export default function WindowHandler() {
    const window = useWindowStore(state => state.window)
    const setWindow = useWindowStore(state => state.updateWindow)

    return (
        <div className="flex justify-center">

            <Topnav className={`gap-4 py-2 px-4  border-b-4 rounded-t-lg ${window != 'code' ? 'border-zinc-800':'border-zinc-950 hover:bg-zinc-900 hover:border-zinc-900'}`}  title='' onClick={()=>{setWindow('chat')}} icon={<ChatIcon width={16} height={16}/>}/>
            <Topnav className={`gap-4 py-2 px-4  border-b-4 rounded-t-lg ${window!== 'chat' ? 'border-zinc-800':'border-zinc-950 hover:bg-zinc-900 hover:border-zinc-900'}`} title='' onClick={()=>{setWindow('code')}} icon={<CodeIcon width={16} height={16}/>}/>     
                
        </div>
    )

}