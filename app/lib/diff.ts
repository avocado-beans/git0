export type Tree = Map<string, [number, number]>
export type Diff = {
    string: string; 
    edit: Edit;
}[]
export type Edit = 'insertion' | 'deletion' | 'equal'

export function getDiffTree(original: string | string[], modified: string | string[]) {
    const n: number = original.length
    const m: number = modified.length

    const queue: [number, number][] = [[0,0]]
    let next: number = 0

    let neighbors: [number, number][] = []
    const visited = new Map<string, boolean>()
    let cameFromDiagonal: boolean = false

    const graph: Tree = new Map<string, [number, number]>()
    
    // Get array of neighboring nodes
    function getNeighbors(x: number, y: number): [number, number][] {
        if (cameFromDiagonal && (original[x+1] != modified[y+1] || original[x+1] == undefined)) {
            // Set end of diagonal as end of common substring node
            cameFromDiagonal = false

            // Make sure the orthogonal verticies of the diagonal are marked as visited
            visited.set(
                [x-1, y].toString(),
                true
            )
            visited.set(
                [x, y-1].toString(),
                true
            )

            neighbors.push([x, y])
            
            return neighbors
        }

        // Check if line is a diagonal
        if (original[x+1] == modified[y+1] && original[x+1] != undefined) {
            // Count diagonal node as visited
            visited.set(
                [x, y].toString(),
                true
            )
            // Make sure the orthogonal verticies of the diagonal are marked as visited
            visited.set(
                [x-1, y].toString(),
                true
            )
            visited.set(
                [x, y-1].toString(),
                true
            )

            cameFromDiagonal = true
            return getNeighbors(x+1,y+1)
        }    
        
        // Check if there is space to the right
        if (x<n-1) {
            neighbors.push([x+1, y])
        }
        
        // Check if there is space under
        if (y<m-1) {
            neighbors.push([x, y+1])
        }

        // Return array of neighbors
        return neighbors
    }
    
    // While last node hasn't been reached
    while (queue[next][0] != n-1 || queue[next][1] != m-1) {
        // Get next node in queue
        const parentNode = queue[next]
        // Don't check a node that's already visited
        if (visited.get(parentNode.toString()) == true) {
            queue.shift()
            continue
        }

        // Get the neighboring nodes (children nodes) of the parentNode
        let neighborNodes: [number, number][] = getNeighbors(parentNode[0], parentNode[1])

        // Don't add a node that's already in the queue
        for (const node of queue) {
            neighborNodes = neighborNodes.filter(arr => (arr[0] != node[0] || arr[1] != node[1]))
        }
        
        // Add to look up table for easy tracing
        for (const node of neighborNodes) {
            graph.set(
                node.toString(),
                parentNode
            )
        }
        
        // Check neighboring nodes
        for (const node of neighborNodes) {
            queue.push(node)
            // Clear neighbor array
            neighbors = []
        }
        
        // Dequeue node
        visited.set(
            parentNode.toString(),
            true
        )
        next++
    }

    return graph;
}

export function findTrace(s: [number, number], e: [number, number], map: Tree) {
    const path: [number, number][] = [e]
    const editScript: { from: [number, number], to: [number, number], edit: Edit}[] = []

    // while origin hasn't been reached
    while (path[path.length-1][0] != s[0] || path[path.length-1][1] != s[1]) {
        // get parent of latest node in trace
        const node: [number, number] = path[path.length-1]
        const parent: [number, number] | undefined = map.get(node.toString())

        // if a parent exists
        if (parent != undefined) {
            // check type of edit
            {
                const xDiff: number = path[path.length-1][0]-parent[0]
                const yDiff: number = path[path.length-1][1]-parent[1]
                const edit: Edit = 
                xDiff < yDiff ? 'insertion' :
                xDiff > yDiff ? 'deletion' :
                'equal'
                
                editScript.push({
                    from: parent,
                    to: node,
                    edit: edit
                })
            }
            path.push(parent)
        }
    }

    return editScript.reverse()
}


export function getDiff(original: string | string[], modified: string | string[]) {
    // Add empty space infront of strings to start graph from 0,0
    if (typeof original == "object") {
        original=['', ...original]
        modified=['', ...modified]
    }

    if (typeof original == "string") {
        original=' '+original
        modified=' '+modified    
    }


    // instantiate diff object
    const diff: Diff = []

    // get diff tree map
    const map: Tree = getDiffTree(original, modified)

    // get editscript trace
    const editScript = findTrace([0,0], [original.length-1, modified.length-1], map)
    
    // fill diff object
    for (const edit of editScript) {
        if (edit.edit == "deletion") diff.push({string: original[edit.to[0]], edit: edit.edit})
        if (edit.edit == "insertion")  diff.push({string: modified[edit.to[1]], edit: edit.edit})
        // if no edit, iterate through skipped diagonal nodes and add them to diff 
        if (edit.edit == "equal") {
            let diagonalIndex: number = 1
            for (let i=edit.from[1]; i<edit.to[1]; i++) {
                diff.push({string: original[edit.from[0]+diagonalIndex], edit: edit.edit})
                diagonalIndex++
            }
        }
    }

    return diff
        
}