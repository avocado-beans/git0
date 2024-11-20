import { Gemini } from "@/app/lib/gemini";
import useContextStore from "@/app/lib/contextStore";

export default async function UpdateResponseMessage() {
    const state = useContextStore.getState()
    const context = state.context
    const updateContext =state.updateContext

    let prompt = ''
    for (let message of context.slice(0, -1)) {
        prompt += `${message.sender}: ${message.message}\n`
    }

    prompt += 'AI: '
    
    try {
    console.log('trying')
    const response = await Gemini(prompt)
    console.log(response)
    if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const answer: string = response.candidates[0].content.parts[0].text
        const newContext = [...context.slice(0, -1), {
            sender: "AI",
            message: answer
        }]
    
        updateContext(newContext)
    } else {
        const newContext = [...context.slice(0, -1), {
            sender: "AI",
            message: "I'm sorry. I wasn't able to process that request. Could you try again?"
        }]
    
        updateContext(newContext)
    }
    } catch {
        const newContext = [...context.slice(0, -1), {
            sender: "AI",
            message: 'Connection error. Please, check your internet and try again. '
        }]
    
        updateContext(newContext)
    }
    
}