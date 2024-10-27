'use client'
import { useEffect, useState, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';

import { EditorView } from 'codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';

import { Gemini, GeminiResponse } from './preview/gemini';

const customLinterTheme = EditorView.theme({
  'span.ͼm': {
    color: 'gray'
  }
});

export default function App() {
  const [code, setCode] = useState<string>("console.log('hello')")
  const [selectedCode, setSelectedCode] = useState<string>('');
  const [geminiCode, setGeminiCode] = useState<string>();

  const [isLoading, setIsLoading] = useState<boolean>(false);  
  const [prompt, setPrompt] = useState<string>('Generate a click counter in react js with typescript, give code only');
  const [trigger, setTrigger] = useState<boolean>(false);

  const codeRef = useRef<any>(null);

  const handleSelection = () => {
    const selectionStart = codeRef.current!.view.viewState.state.selection.main.from;
    const selectionEnd = codeRef.current!.view.viewState.state.selection.main.to;
    const selection = code.slice(selectionStart, selectionEnd);

    if (selection.length > 0) setSelectedCode(selection);
  }

  useEffect(() => {
    const fetchData = async () =>{
      setIsLoading(true);
      try {
        console.log(selectedCode, prompt)
        const res: GeminiResponse = await Gemini(selectedCode.length > 0 ? `${selectedCode}\n${prompt}` : prompt)
        setGeminiCode(res?.candidates[0].content.parts[0].text)
      } catch (err) {
        console.log('Error fetching data:', err)
      } finally {
        setIsLoading(false);
      }
    } 
    
    if (trigger) {
      
      fetchData();
      setTrigger(false);
    }
  }, [trigger])

  return (
    <div className='flex flex-col justify-between'>
      {/* Actual code stuff */}
      <div className='flex p-[10px] gap-[10px] h-[85vh]'>        
        <div className='flex flex-col w-[60%]'>
            <CodeMirror
                className='border-y border-x-2'
                value={selectedCode}
                maxHeight='40vh'
                extensions={[
                  langs.tsx(),
                  customLinterTheme,
                  EditorView.lineWrapping
                ]}

                onChange={(e) => {setSelectedCode(e)}}
            />           
            <CodeMirror
                className='border-y border-x-2 overflow-auto'
                value={code}
                extensions={[
                  langs.tsx(),
                  customLinterTheme,
                  EditorView.lineWrapping
                ]}
                
                onChange={(e) => {setCode(e)}}
                onMouseUp={handleSelection}
                onKeyUp={handleSelection}
                ref={codeRef}
            />
        </div>

        <div className='flex flex-col w-[40%]'>
          {isLoading ? 
          <div>Thinking...</div> : 
          <div className='border-2 overflow-auto'>
            <CodeMirror
              value={geminiCode}
              extensions={[
                langs.markdown(),
                customLinterTheme,
                EditorView.lineWrapping
              ]}
              />
          </div>
          // <iframe height={'100%'} className='border-2' src="http://localhost:3000/preview"></iframe>
          }
        </div>
      </div>
      
      {/* Nav bar */}
      <div className='flex bottom-0 p-[10px] gap-[10px] w-[100%] bg-white border-t-2'>
        <div className='w-[60%]'>
          <form className='flex items-start justify-start gap-[10px]' onSubmit={(e) => {e.preventDefault(); setTrigger(true)}} >
            <button className='px-[40px] py-[10px] bg-purple-600 text-white border-2'>prompt</button>
            <textarea className='flex-1 resize-none outline-none text-wrap w-[100%] min-h-[100%] px-[10px] border-2' placeholder="enter prompt" onChange={(e) => {setPrompt(e.target.value)}}/>
          </form>
        </div>

        <div className='w-[40%] border-2'>
        <span>[Gemini Code Review]:</span>
        </div>
      </div>
    </div>
  )
}