import Header from './Header'
import Box from './Chatbox'
import Button from './Button'
import { debounce } from '@/app/lib/utils'
import { useState } from 'react'
import useInputStore from '@/app/lib/inputStore'
import useWindowStore from '@/app/lib/windowStore'

export default function Landing(props: {'setPage': (page: string | undefined)=>void}) {

    const [text, setText] = useState<string>('')
    const setWindow = useWindowStore(state => state.updateWindow)

    const handleSetText = debounce((e)=>{
        setText(e.target.value);
    }, 500)

    const updateText = useInputStore((state) => (state.updateInput))

    return (
        <div  className='flex justify-center bg-zinc-950'>
      <div className='flex flex-col justify-center items-center w-5/6 md:w-3/4 lg:w-1/2 gap-10 h-[100vh] font-funnel text-lg py-24 overflow-hidden'>
        <Header />

        <div className='flex flex-col bg-zinc-900 rounded-t-2xl rounded-b-3xl w-full'>
          <span className='flex justify-between gap-4 p-2 px-6 text-slate-400 text-sm'>
          Want to use your own API key?
          <button className='text-teal-500 font-semibold'>Switch Token</button>
          </span>

          <form className='flex flex-col border-2 border-zinc-900 rounded-2xl w-full gap-4 p-4 bg-zinc-950' onSubmit={(e)=>{e.preventDefault(); console.log('resident evil is a prophecy'); updateText(text)}}>

            <Box width='full' onChange={handleSetText} onEnter={()=>{
              setWindow('chat'); 
              props.setPage('app'); 
              localStorage.setItem('page', 'app')
            }} placeholder='Paste a repo link or ask a question.' maxHeight='max-h-[40vh]' i={0} setI={(i: number)=>{}}/>

            <div className='flex justify-center items-center w-full'>
              <div className='flex flex-col md:flex-row justify-start items-start gap-4 w-full'>

                <Button content="New blank project" onClick={()=>{
                    setWindow('code'); 
                    props.setPage('app'); 
                    localStorage.setItem('page', 'app')
                }}/>

                <Button content="Chat with Gemini" onClick={()=>{
                    setWindow('chat'); 
                    props.setPage('app'); 
                    localStorage.setItem('page', 'app')
                }}/>

              </div>
            </div>
            
          </form>
        </div>

      </div>
    </div>
    )
}