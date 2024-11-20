import { useEffect, useRef, useState } from "react"
import useChatStore from "@/app/lib/chatStore";
import useContextStore from "@/app/lib/contextStore"
import { debounce } from "@/app/lib/utils";
import UpdateResponseMessage from "../../lib/askGemini";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Box(props: {'width':string, 'maxHeight': string, 'onChange'?: (...args: any[]) => void, 'placeholder': string, 'i': number, 'setI': Function, 'onEnter'?: (...args: any[])=>void}) {
    const textBoxRef = useRef<HTMLTextAreaElement>(null);

    const context = useContextStore(state => state.context)
    const updateContext = useContextStore(state => state.updateContext)

    const text = useChatStore(state => state.chat)
    const updateText = debounce(useChatStore(state => state.updateChat), 200)

    const updateContxt = (text: string) => {
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

    const handleBoxSize = () => {
        textBoxRef.current!.style.height = ``
        textBoxRef.current!.style.height = `${textBoxRef.current!.scrollHeight}px`
    }

    const handleKey = (e: any) => {

        if (e.key == 'Enter') {
            if (!e.shiftKey) {
                e.preventDefault()
                textBoxRef.current!.value = ``
                textBoxRef.current!.style.height = ''
                
                updateContxt(text)
                UpdateResponseMessage()

                if (props.onEnter) props.onEnter()
            }
            if (e.shiftKey) {
                updateText(textBoxRef.current!.value)
            }
        }

        if (e.shiftKey && props.i >= 2) {
            if (e.key=='ArrowLeft')  {
                props.i < context.length-1 ? props.setI(props.i+2) : {}
            } 

            if (e.key=='ArrowRight')  {
                props.i/2 >= 2? props.setI(props.i-2) : {}
            }
        }
    }

    return(
        <>
            <div className={`flex flex-col justify-center`}>
                <div className={`w-${props.width} rounded-0 ${props.maxHeight} overflow-auto`}>
                    <div className="flex flex-col md:flex-row gap-4 px-2">
                    <textarea ref={textBoxRef} onChange={(e) => {handleBoxSize(); e.target.value != '' ? updateText(e.target.value) : {}}} className="bg-inherit resize-none outline-none w-full overflow-hidden h-[28px] text-slate-300 placeholder-slate-400" placeholder={props.placeholder} onKeyDown={handleKey}></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}