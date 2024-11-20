import { Tool } from "./Tools"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from "react";
import MessageLoader from "./MessageLoader";
import { CopyIcon } from "./Icons";
import ReactMarkdown from 'react-markdown'
import '@/app/preview/reset.css'

export default function Message(props: {'sender': string, 'message': string}) {
    const [ isCopied, setIsCopied ] = useState<boolean>(false)

    const handleCopy = () => {
        if (isCopied != true) {
        console.log('copied text!')
        setIsCopied(true)
        setTimeout(()=>{
            setIsCopied(false)
        }, 3000)
    }}

    const divStyle = props.sender == 'User' ? 'justify-end text-slate-300 md:pl-10 ' : 'justify-start md:pr-10'

    const spanStyle = props.sender == 'User' ? 'bg-zinc-950 text-teal-500 rounded-3xl' : 'w-full'

    return (
        <div className={`flex w-full text-lg ${divStyle}`}>
            <span className={`flex flex-col ${spanStyle}`}>
                {props.message == 'Thinking' ? <MessageLoader /> : <ReactMarkdown>{props.message}</ReactMarkdown>}
            
            { props.sender == 'AI' && props.message != 'Thinking' ? 
            <div className="flex items-center gap-2">
                <CopyToClipboard text={props.message} >
                    <Tool name='' className='text-slate-400' onClick={handleCopy} icon={<CopyIcon width={20} height={20}/>}/>
                </ CopyToClipboard>
                <div className={`flex justify-center items-center w-40 h-10 rounded-full border-2 ${isCopied == true ? 'text-slate-500' : 'text-zinc-950'} ${isCopied == true ? 'border-2 border-zinc-900' : 'border-2 border-transparent'} ${isCopied == true ? 'translate-y-5' : 'translate-y-0'} transition text-sm`}>
                    <span className={`${isCopied == true ? '' : 'hidden'} transition`}>Copied to clipboard.</span>
                </div>
            </div>
             : <></>}
            </span>
        </div>
    )
}