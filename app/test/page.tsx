'use client'
import { getDiff } from "@/app/lib/diff"
import { useState } from "react"
import useInputStore from "../lib/inputStore"

export default function Page() {
    const [original, setOriginal] = useState<string>('driftwood')
    const [modified, setmodified] = useState<string>('artwork')
    const text = useInputStore((state) => (state.input))

    return(
        <>
        {text}
        <p>Original:</p>
        <textarea value={original} onChange={(e) => {setOriginal(e.target.value)}} className=""/>
        <p>Modified:</p>
        <textarea value={modified} onChange={(e) => {setmodified(e.target.value)}}/>
        <p>Minimum edit script</p>
        {getDiff(original.split("\n"), modified.split("\n")).map((e, i) => {
            if (e.edit == "deletion") return <p key={i} className="text-red-500">{e.string}: {e.edit}</p>
            if (e.edit == "insertion") return <p key={i} className="text-green-500">{e.string}: {e.edit}</p>
            if (e.edit == "equal") return <p key={i}>{e.string}: {e.edit}</p>
        })}
        </>
    )
}