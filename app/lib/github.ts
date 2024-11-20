import { Buffer } from "buffer";
import { useContentStore } from "./contextStore";

export default async function getGitTree(owner:string, repo:string, updateFiles:(files: string[])=>void, updateFolders:(folders: string[])=>void, dir:string="", file:string="", branch:string='main') {
    const contentState = useContentStore.getState()
    const updateContent = contentState.updateContent

    let url = dir.length > 1 ? `https://api.github.com/repos/${owner}/${repo}/contents/${dir}/${file.length > 0 ? `${file}?ref=${branch}` : ''}` : `https://api.github.com/repos/${owner}/${repo}/contents`

    console.log('url', url)
    const res = await fetch(url)

    if (file.length > 0) {
        const res_json = await res.json()
        const file_content: string = Buffer.from(res_json.content, 'base64').toString('utf-8')
        updateContent(file_content)
        return
    }

    const res_json: any[] = await res.json()
    let tree: {'folders':string[], 'files':string[],} = {'folders':[], 'files':[],}

    res_json.forEach((item) => {
        item.type == "dir" ? tree.folders.push(item.name) : tree.files.push(item.name)
    })

    updateFiles(tree.files)
    updateFolders(tree.folders) 

    console.log(tree.files)
    console.log(tree.folders)

    return
}

// const owner = "avocado-beans"
// const repo = "cathequeen"
// const func = getGitTree(owner, repo, "static/stylesheets", "style.css")



