import { create } from 'zustand'

type ChatStore = {
    chat: string,
    updateChat: (input: string) => void
}

const useChatStore = create<ChatStore>(
    (set) => (
        {
            chat: '',
            updateChat: (input: string) => set(()=>({chat: input}))
        }
    )
)

export default useChatStore