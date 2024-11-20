'use client'
import { useEffect, useState, useRef } from 'react';
import CodeMirror, { Extension } from '@uiw/react-codemirror';

import * as events from '@uiw/codemirror-extensions-events';
import { EditorView } from 'codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';

import { Gemini, GeminiResponse } from './lib/gemini';

const customLinterTheme = EditorView.theme({
  // 'span.ͼm': {
  //   color: 'gray'
  // }
});

const eventExt2 = events.content({
  selectionchange: (evn) => {
    console.log(evn);
  },
});

export default function App() {
  const [code, setCode] = useState<string>("console.log('hello')")
  const [selectedCode, setSelectedCode] = useState<string>('');
  const [geminiCode, setGeminiCode] = useState<string>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [highLightText, setHighLightText] = useState<Extension>(
    EditorView.theme({
    // '.cm-line:nth-of-type(1)': {
    //   backgroundColor: 'red'
    // }
    }));

  const [prompt, setPrompt] = useState<string>('Generate a click counter in react js with typescript, give code only');
  const [trigger, setTrigger] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const codeRef = useRef<any>(null);

  const handleSelection = () => {
    const { viewState } = codeRef.current!.view;
    // console.log(codeRef.current.view)
    if (viewState?.state) {const { from: selectionStart, to: selectionEnd} = viewState?.state?.selection?.main;
    console.log(viewState?.state?.selection)
    const selection = code.slice(selectionStart, selectionEnd);
    // console.log(selection)
    setSelectedCode(selection);}
  }

  useEffect(() => {
    const fetchData = async () =>{
      setGeminiCode('// Thinking . . .')
      try {
        console.log(selectedCode, prompt)
        const res: GeminiResponse = await Gemini(selectedCode.length > 0 ? `${selectedCode}\n${prompt}. Reply exclusively with code markdown and snippets. Retain comments already in the code but avoid adding your own comments unless necessary or explicitly instructed to do so.` : prompt)
        if (res?.candidates?.[0]?.content?.parts?.[0]?.text) {
          const answer: string = res.candidates[0].content.parts[0].text
          const language: string = answer.split("```")[1].split("\n")[0]
          console.log(language)
          setGeminiCode(answer.split(`${language}\n`)[1].split("```")[0]);

        } else {
          console.error('Error fetching data: Unexpected response format', res);
          setGeminiCode("// Error: Invalid response from Gemini");
        }
      } catch (err) {
        console.log('Error fetching data:', err)
        setGeminiCode("// Error fetching Gemini's Response")
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
      <div className='flex flex-row'>
        <div className='w-[50%]'>

          <CodeMirror
          value={code}
          height='85vh'
          extensions={[
            langs.tsx(),
            highLightText,
            EditorView.lineWrapping,
            eventExt2
            ]}
          ref={codeRef}
          onKeyUp={handleSelection}
          onMouseLeave={handleSelection}
          onMouseUp={handleSelection}
          onChange={setCode}
          />
        </div>

        <div className='w-[50%]'>

          <CodeMirror
            value={geminiCode}
            height='85vh'
            extensions={[
              langs.tsx(),
              customLinterTheme,
              EditorView.lineWrapping
            ]}
            />
        </div>

      </div>
      
      {/* Nav bar */}
      <div className='flex bottom-0 p-[10px] w-[100%] bg-white border-t-2'>

        {/* Prompt box */}
        <div className='w-[50%]'>
          <form className='flex items-start justify-start gap-[10px]' onSubmit={(e) => {e.preventDefault(); setTrigger(true)}} >
            <button className='px-[40px] py-[10px] bg-purple-600 text-white border-2'>prompt</button>
            <textarea className='flex-1 resize-none outline-none text-wrap w-[100%] min-h-[100%] px-[10px] border-2' placeholder="don't be shy, ask me anything. i'm here to help :)" onChange={(e) => {setPrompt(e.target.value)}}/>
          </form>
        </div>

        {/* I don't know why this is here */}
        <div className='w-[50%] border-2'>
        <span>[Gemini Code Review]:</span>
        </div>
      </div>
    </div>
  )
}