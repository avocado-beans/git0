'use client'
import CodeMirror from '@uiw/react-codemirror';
import { theme } from './lib/utils';
import { EditorView } from 'codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';

import { useRef, useState } from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const customLinterTheme = EditorView.theme({
    '.cm-scroller,.cm-gutters' : {
        backgroundColor: 'black',
        borderColor: 'rgb(51 65 85)'
    },
  });

export default function Page() {
    const [code, setCode] = useState<string>("console.log('hello')")
    const [selectedCode, setSelectedCode] = useState<string>("console.log('hello')")
    const codeRef = useRef<any>(null);

    const handleSelection = () => {
        const { viewState } = codeRef.current!.view;
        if (viewState?.state) {
            const { from: selectionStart, to: selectionEnd} = viewState?.state?.selection?.main;
            const selection = code.slice(selectionStart, selectionEnd);
            console.log(selection)
            setSelectedCode(selection);
        }
    }

    return(
    <div className='bg-zinc-950 h-[100vh] w-full'>
        
        <Navbar/>
        <div className='flex justify-start items-start font-typewriter border-4 border-zinc-950 rounded-t-2xl bg-zinc-950 w-full'>
            <div className='flex flex-col justify-start w-3/5 text-slate-400 p-4 pt-2 pb-0 gap-4 h-full text-sm bg-zinc-950'>
                <div className='overflow-y-auto w-full pr-4'>
                    <Sidebar />
                </div>
            </div>
                

            {/* <div className='text-slate-500 p-4 w-1/3'>
                Hey
            </div> */}

            <div className='flex flex-col editor overflow-y-auto border-4 border-zinc-900 rounded-2xl bg-zinc-900 mt-2'>
                <div className='p-2 bg-zinc-900 text-sm text-slate-500'>
                    <span className='px-8 py-1 bg-black rounded-lg'>page.tsx</span>
                </div>
                <div className='p-2 rounded-2xl bg-black'>

                <CodeMirror
                className='overflow-x-hidden overflow-y-auto'
                value={code}
                ref={codeRef}
                maxHeight='80vh'
                onChange={setCode}
                
                onKeyUp={handleSelection}
                // onMouseLeave={handleSelection}
                onMouseUp={handleSelection}
                
                extensions={[
                    langs.tsx(),
                    customLinterTheme,
                    theme,
                    EditorView.lineWrapping
                ]}/>
                </div>
            </div>
        </div>
    </div>
    )
}