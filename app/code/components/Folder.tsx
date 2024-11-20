import { useState, useEffect } from "react"
import getGitTree from "@/app/lib/github"

export function File(props: {'fileName': string}) {
    return (
        <div className="flex pl-2 gap-1 py-0.5 items-center hover:bg-zinc-900 h-full rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 8L9.00319 2H19.9978C20.5513 2 21 2.45531 21 2.9918V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5501 3 20.9932V8ZM10 4V9H5V20H19V4H10Z"></path></svg>
            <span>{props.fileName}</span>
        </div>
    )
}
export default function Folder(props: {'owner': string, 'repo': string, 'root'?: string, 'folderName': string, 'files': string[], 'subFolders': string[]}) {
    const [showTree, setShowTree] = useState<boolean>(false)
    const [ files, setFiles ] = useState<string[]>([])
    const [ folders, setFolders ] = useState<string[]>([])

    console.log('loaded folder')
    
    useEffect(() => {
        console.log('hey', props.owner, props.repo, props.root)
        getGitTree(props.owner, props.repo, setFiles, setFolders, props.root);
      }, []);

    return(
        <div className="flex py-0.5 flex-col">
            
            <div className="flex">
                <div className="flex w-full rounded-md gap-2 items-center hover:bg-zinc-900">
                    <button className="hover:bg-zinc-800 h-full rounded-l-md" onClick={ showTree == true ? () => {setShowTree(false)} : () => {setShowTree(true)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={showTree == true ? 'rotate-90': ''} width="16" height="16" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></button>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z"></path></svg>
                    <span className="pr-4">{props.folderName}</span>
                </div>
            </div>

            {/* Reveal folders first */}
            <div className="flex flex-col px-2 ">
            {showTree == true ? 
            folders.map((v, i) => {
                console.log('root:', props.root+'/'+props.folderName+'/'+v)
                return (<Folder key={i}  owner={props.owner} repo={props.repo}  root={props.folderName+'/'+v} folderName={v} files={files} subFolders={folders} />)
            }) : <></>}

            {/* Then reveal files */}
            {showTree == true ? 
            files.map((v, i) => {
                return (<File key={i} fileName={v}/>)
            }) : <></>}

            </div>
        </div>
    )
}