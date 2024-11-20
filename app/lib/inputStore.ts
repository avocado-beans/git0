import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
    input: string,
    updateInput: (input: string) => void
}

const useInputStore = create(
    persist<State>(
        (set) => ({
            input: '',
            updateInput: (input: string) => set(() => ({ 'input': input}))
        }),
        {
            name: 'inputStore',
        }
    ))

export default useInputStore;