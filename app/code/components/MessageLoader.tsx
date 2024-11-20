import { useEffect, useState } from "react"

export default function MessageLoader() {
    const [ dotOne, setdotOne ] = useState<boolean>(false)
    const [ dotTwo, setDotTwo ] = useState<boolean>(false)
    const [ dotThree, setDotThree ] = useState<boolean>(false)
    
    useEffect(()=>{
        setTimeout(()=>{
            dotOne == false ? setdotOne(true) : setdotOne(false)
        }, 600)
        setTimeout(()=>{
            dotOne == false ? setDotTwo(true) : setDotTwo(false)
        }, 750)
        setTimeout(()=>{
            dotOne == false ? setDotThree(true) : setDotThree(false)
        }, 900)
    },[dotOne])

    return (
        <div className="flex gap-2 *:w-4 *:h-4 *:rounded-full *:bg-zinc-900">
            <div className={`${dotOne == true ? '-translate-y-2' : 'translate-y-2'} transition duration-500`}></div>
            <div className={`${dotTwo == true ? '-translate-y-2' : 'translate-y-2'} transition duration-500`}></div>
            <div className={`${dotThree == true ? '-translate-y-2' : 'translate-y-2'} transition duration-500`}></div>
            
        </div>
    )
}