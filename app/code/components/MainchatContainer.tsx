import { Tool } from "../components/Tools"
import { SendIcon } from "./Icons"
import Message from "../components/Messagebox"
import Chat from "../components/Mainchat"
import useChatStore from "@/app/lib/chatStore"
import useContextStore from "@/app/lib/contextStore"
import UpdateResponseMessage from "../../lib/askGemini"
import Thumbnail from "./Thumbnail"

export default function MainChatContainer(props: {'i': number, 'setWindow': (window: 'chat' | 'code')=>void,'setI': (i: number)=>void}) {
    const context = useContextStore(state => state.context)
    const updateContext = useContextStore(state => state.updateContext)

    const text = useChatStore(state => state.chat)    
    
    const updateContxt = () => {
        console.log('i', props.i)
        updateContext(
            [...context, {
                sender: 'User',
                message: text
            }, {
                sender: 'AI',
                message: `Thinking`
            }])

        props.i < 2 ? props.setI(props.i+2) : props.setI(2)
    }

    return (<>
        <div className="w-full h-full pt-12">
            <div className="flex flex-col gap-0 items-center justify-between w-full h-full overflow-y-scroll">
                
                <div className={`flex flex-col justify-${ context.length < 2 ? 'start':'between'} py-5 w-5/6 md:w-4/5 gap-2 h-${ context.length < 2 ? 'full':'fit'}`}>
                    <div className="flex flex-col justify-center gap-2 py-4 h-full ">
                        {  context.length < 2 ? 
                            <Thumbnail setWindow={props.setWindow} /> : <></>
                        }
                        { context.length >= 2 ? 
                            <>
                            <Message sender={context[context.length-(props.i)].sender} message={context[context.length-(props.i)].message}/>
                            <Message sender={context[context.length-(props.i-1)].sender} message={context[context.length-(props.i-1)].message}/>
                            </> : <></>
                        }
                    </div>
                </div>
                            
                <div className="flex flex-col items-center w-full h-fit sticky bottom-0 rounded-2xl bg-zinc-950">
                    {/* Chatbox */}
                    <div className="w-5/6 md:w-4/5">
                        <div className="flex flex-col items-center h-fit bg-zinc-900 border-2 border-zinc-900 rounded-2xl pt-2">

                            <div className="flex flex-col items-start gap-4 w-full bg-zinc-950 p-2 rounded-2xl">
                                <div className="flex items-end gap-2 w-full">
                                    <Chat className="pb-2" i={props.i} setI={props.setI}/>
                                    <Tool name='' onClick={()=>{updateContxt(); UpdateResponseMessage(); console.log('i', props.i)}}className="border-2 border-zinc-900 hover:bg-slate-400 hover:text-black gap-2 p-2 rounded-2xl" icon={<SendIcon width={16} height={16}/>}/>
                                </div>
                            </div>
                        </div>

                        <span className="flex w-full justify-center py-2 text-sm text-slate-500 text-center">Gemini can make mistakes. Check thoroughly for bugs before deploying.</span>
                    </div>
                </div>
            </div>
        </div>
    </>)
}