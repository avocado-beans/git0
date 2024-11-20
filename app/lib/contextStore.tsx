import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Context = {
    sender: string,
    message: string
}[]

type ContextState = {
    context: Context,
    updateContext: (newContext: Context) => void
}

type ContentState = {
    content: string,
    updateContent: (newContent: string) => void

}

type FolderStructure = {
    files: string[],
    folders: string[],
    updateFiles: (files: string[]) => void,
    updateFolders: (folders: string[]) => void,
}

const useContextStore = create(
    persist<ContextState>(
        (set) => ({
            context: [],
            updateContext: (newContext: Context) => set(()=>({context: newContext}))
    }),
    {
        name: 'contextStore'
    }
))

const useStructureStore = create(
    persist<FolderStructure>(
        (set) => ({
            files: [],
            folders: [],
            updateFiles: (files: string[]) => set(()=>({files: files})),
            updateFolders: (folders: string[]) => set(()=>({folders: folders}))
    }),
    {
        name: 'structureStore'
    }
))

const useContentStore = create<ContentState>(
    (set) => ({
        content: '',
        updateContent: (newContent: string) => set(()=>({content: newContent}))
    })
)

export default useContextStore
export { useContentStore, useStructureStore }