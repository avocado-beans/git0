import { create } from "zustand";
import { persist } from "zustand/middleware";

type WindowStore = {
    window: 'chat' | 'code' | 'home',
    updateWindow: (window: 'chat' | 'code' | 'home') => void
}

const useWindowStore = create(
    persist<WindowStore>(
        (set)=>({
        window: 'home',
        updateWindow: (window: 'chat' | 'code' | 'home') => set(()=>({window: window}))
        }),
        {
            name: 'windowStore'
        }
    )
)

export default useWindowStore