'use client'
import { useEffect, useState } from "react"

export default function Header() {
    const [typewriter, setTypewriter] = useState<{i: number, backspace: boolean,}>({
        i: 0,
        backspace: false,
    })

    const [cursor, setCursor] = useState<'cursor' | ''>('')

    const [description, setDescription] = useState<{value: string, alt: string[]}>({value: ' ', alt: [` break the code down.`, ` generate a README.`, ` modify and optimize.`]});
    

    useEffect(()=>{
        if (!typewriter.backspace) {
        setTimeout(()=>{
            const prev_desc = description.value
            
            if (description.alt[typewriter.i].split(prev_desc)[1][0]?.length > 0) {
                const new_desc = prev_desc+description.alt[typewriter.i].split(prev_desc)[1][0]
                setDescription({value: new_desc, alt: description.alt})
            } else {
                setCursor('cursor')
                setTimeout(() => {
                    setTypewriter({i: typewriter.i, backspace: true})
                    setCursor('')
                }, 2000)
            }

        },50)}
    },[description, typewriter])

    useEffect(()=>{
        if (typewriter.backspace) {
            setTimeout(()=>{
                const prev_desc = description.value
                if (description.value.length > 1) {
                    const new_desc = prev_desc.slice(0, -1)
                    setDescription({value: new_desc, alt: description.alt})
                }
                if (description.value.length <= 1) {
                    const next_i = typewriter.i+1 == description.alt.length ? 0 : typewriter.i+1
                    setTypewriter({i: next_i, backspace: false})
                }
            },25)
        }        
    },[description, typewriter])

    return(
        <>
            <div className={`flex justify-center w-full`}>            
                <div className="flex justify-start text-center text-4xl leading-snug h-28 md:h-30 lg:h-fit w-full text-slate-400">
                        <span className="hidden md:inline">
                            Choose a repo to <span className="bg-teal-500 text-black ">{description.value}
                                <span className={`${cursor} px-2 bg-teal-200 text-teal-200`}>
                                </span>
                            </span>
                        </span>

                        <div className="w-full md:hidden">
                            <div className="w-full text-nowrap">Choose a repo to</div>
                            <span className="bg-teal-500 text-black ">{description.value}
                                <span className={`${cursor} px-2 bg-teal-200 text-teal-200`}>
                                </span>
                            </span>
                        </div> 
                </div>
            </div>
        </>
    )
}