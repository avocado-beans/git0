'use client'
import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';

import { EditorView } from 'codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';

const customLinterTheme = EditorView.theme({
  'span.ͼm': {
    color: 'gray',
  }
});

export default function App() {
  const [value, setValue] = useState<string>("")
  
  return (
  <div className='flex flex-col p-[10px]'>
    <CodeMirror
      className='w-[100%] border-2'
      value={value}
      extensions={[
        langs.tsx(),
        customLinterTheme
      ]}

      onChange={(e) => {setValue(e)}}
      />
  </div>
  )
}