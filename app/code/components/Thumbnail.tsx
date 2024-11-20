import { useEffect, useState } from "react"
import { Tool } from "./Tools"
import { QuestionIcon2, CodeIcon2 } from "./Icons"
export default function Thumbnail(props: {'setWindow': (window: 'chat' | 'code')=>void}) {
    const startCSS = 'translate-y-0'
    const endCSS = 'text-zinc-950 translate-y-10'

    const [fadeInOne, setfadeInOne] = useState<boolean>(false)
    const [fadeInTwo, setfadeInTwo] = useState<boolean>(false)
    const [fadeInThree, setfadeInThree] = useState<boolean>(false)
    const [fadeInFour, setfadeInFour] = useState<boolean>(false)
    const [fadeInFive, setfadeInFive] = useState<boolean>(false)

    useEffect(()=>{
        setTimeout(()=>{
            setfadeInOne(true)
        }, 50)
        setTimeout(()=>{
            setfadeInTwo(true)
        }, 200)
        setTimeout(()=>{
            setfadeInThree(true)
        }, 350)
        setTimeout(()=>{
            setfadeInFour(true)
        }, 500)
        setTimeout(()=>{
            setfadeInFive(true)
        }, 650)
    },[])

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-full">
            <div className="flex gap-3 md:gap-4 text-5xl md:text-6xl *:transition *:duration-[1000ms]">
                <span className={`${fadeInOne ? startCSS:endCSS}` }>Hey, </span>
                <span className={`${fadeInTwo ? startCSS:endCSS}` }>You.</span>
            </div>
            <span className={`text-xl text-teal-500 ${fadeInThree ? startCSS:endCSS} transition duration-[1000ms]`}>Ask me anything.</span>

            <div className='flex flex-col md:flex-row gap-2 md:gap-10 *: transition *:duration-[1000ms] *:gap-2'>
                <Tool header={true} name='How to use' className={`${fadeInFour ? startCSS:endCSS}`} icon={<QuestionIcon2 width={16} height={16}/>}/>

                <Tool header={true} name='Code editor' className={`${fadeInFive ? startCSS:endCSS}`} icon={<CodeIcon2 width={16} height={16}/>}/>
            </div>

        </div>
    )
}