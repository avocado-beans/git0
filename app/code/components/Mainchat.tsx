import Box from "./Chatbox"

export default function Chat(props: {'className'?: string, 'i': number, 'setI': Function}) {
    return(
        <div className={`w-full text-lg overflow-auto ${props.className}`}>
            <Box width='full' maxHeight='max-h-[40vh]' placeholder="Ask anything." i={props.i} setI={props.setI}/>
        </div>
    )
}