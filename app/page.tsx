'use client'
import { useEffect, useState, useRef, Suspense } from 'react';
import CodeMirror from '@uiw/react-codemirror';

import { EditorView } from 'codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';

import { Gemini, GeminiResponse } from './editor/gemini';

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
        const res: GeminiResponse = await Gemini(selectedCode.length > 0 ? selectedCode+ '\n' +prompt : prompt)
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
    <div className='flex justify-evenly'>
    <div className='flex flex-col w-[50%] p-[10px] gap-[10px]'>
    <form onSubmit={(e) => {e.preventDefault(); setTrigger(true)}}>
      <input className='w-[100%] text-wrap' type="text" placeholder="Enter instructions" onChange={(e) => {setPrompt(e.target.value)}}/>
    </form>

    <CodeMirror
      className='border-2'
      value={selectedCode}
      extensions={[
        langs.tsx(),
        customLinterTheme,
        EditorView.lineWrapping
      ]}

      onChange={(e) => {setSelectedCode(e)}}
      />

    <CodeMirror
      className='border-2'
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

    <div className='flex flex-col w-[50%] p-[10px] gap-[10px] overflow-y-auto h-[100vh]'>
      <span>[Gemini Code Review]:</span>
      {isLoading ? 
      <div>Thinking...</div> : 
      <CodeMirror
        className='border-2'
        value={geminiCode}
        extensions={[
          langs.tsx(),
          customLinterTheme,
          EditorView.lineWrapping
        ]}
        />}
      </div>
  </div>
  )
}