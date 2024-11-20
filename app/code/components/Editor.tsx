import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import './Theme.css'

import getGitTree from "@/app/lib/github";
import { useEffect, useRef } from "react";
import { useContentStore } from "@/app/lib/contextStore";
import Explorer from "./Explorer";


function App() {
  const content = useContentStore(state=>state.content)

  const codeRef = useRef<any>()

  return (
    <div className="flex mt-12 w-full h-full">
        <Explorer repoOwner="avocado-beans" repoName="cathequeen" />

        <AceEditor
            className="ace-tomorrow-night font-typewriter"
            height="100%"
            width="100%"
            value={content}
            mode="javascript"
            fontSize="16px"
            highlightActiveLine={true}
            setOptions={{
                enableLiveAutocompletion: true,
                showLineNumbers: true,
                tabSize: 2
            }}
            ref={codeRef}
            // onFocus={()=>{console.log(codeRef.current)}}
            onSelectionChange={(e)=>{console.log(e.anchor.column, e.cursor.column)}}
        />
    </div>
  );
}
export default App;