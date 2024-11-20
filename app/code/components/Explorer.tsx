import Folder from "./Folder"
import { useStructureStore } from "@/app/lib/contextStore"

export default function Explorer(props: {'repoOwner': string, 'repoName': string}) {
    const files = useStructureStore(state=>state.files)
    const folders = useStructureStore(state=>state.files)

    return(
        <div className="flex flex-col gap-2 h-fit w-[300px] p-4 z-[999] border-l-2 border-zinc-900">
            <div className="group flex items-center gap-2 transition">
                <div className="group-hover:bg-slate-400 p-1 group-hover:text-black bg-zinc-900 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="group-hover:-translate-y-0.5 transition" fill="currentColor"><path d="M10 2C10.5523 2 11 2.44772 11 3V7C11 7.55228 10.5523 8 10 8H8V10H13V9C13 8.44772 13.4477 8 14 8H20C20.5523 8 21 8.44772 21 9V13C21 13.5523 20.5523 14 20 14H14C13.4477 14 13 13.5523 13 13V12H8V18H13V17C13 16.4477 13.4477 16 14 16H20C20.5523 16 21 16.4477 21 17V21C21 21.5523 20.5523 22 20 22H14C13.4477 22 13 21.5523 13 21V20H7C6.44772 20 6 19.5523 6 19V8H4C3.44772 8 3 7.55228 3 7V3C3 2.44772 3.44772 2 4 2H10ZM19 18H15V20H19V18ZM19 10H15V12H19V10ZM9 4H5V6H9V4Z"></path></svg>
                </div>
                <div>Files</div>
            </div>

            <div className="flex flex-col">
                <Folder owner={props.repoOwner} repo={props.repoName} folderName={props.repoOwner+'/'+props.repoName} files={files} subFolders={folders}/>
            </div>
        </div>
    )
}