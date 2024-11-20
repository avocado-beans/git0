import { ReactNode } from "react"

export function Tool(props: {'name': string, 'icon'?: ReactNode, 'className'?: string, 'onClick'?: (...args: any[]) => void, 'header'?: boolean}) {
    return (
        
        <button className={`flex group w-fit items-center text-nowrap ${props.className} ${props.header == true ? '' : 'transition'}`} onClick={props.onClick} >
            <div className="group-hover:-translate-y-1 transition">{props.icon}</div>
            {props.name != '' ? <span className={`transition ${props.header == true ? '' : 'group-hover:-translate-y-1 delay-100'}`}>{props.name}</span> : <></>}
        </button>
    )
}

export default function Tools() {
    return (
        <div className="flex flex-col border-t-2 pt-2 border-zinc-900 gap-2">
            <div className="group flex items-center gap-2">
                <div className="group-hover:bg-slate-400 group-hover:text-black bg-zinc-900 p-1 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="group-hover:-translate-y-0.5 transition" fill="currentColor"><path d="M11 2.53513C10.4117 2.19479 9.72857 2 9 2 6.79086 2 5 3.79086 5 6V7.77422C4.14895 8.11644 3.45143 8.64785 2.94126 9.34933 2.29239 10.2415 2 11.3347 2 12.5 2 14.0614 2.79529 15.4356 4 16.242V17.5C4 19.9853 6.01472 22 8.5 22 9.42507 22 10.285 21.7209 11 21.2422V17.5C11 16.167 10.67 15.3147 10.1402 14.7408 9.59743 14.1528 8.71622 13.7165 7.3356 13.4864L7.6644 11.5136C8.96602 11.7305 10.1058 12.1373 11 12.8271V2.53513ZM13 2.53513V12.8271C13.8942 12.1373 15.034 11.7305 16.3356 11.5136L16.6644 13.4864C15.2838 13.7165 14.4026 14.1528 13.8598 14.7408 13.33 15.3147 13 16.167 13 17.5V21.2422C13.715 21.7209 14.5749 22 15.5 22 17.9853 22 20 19.9853 20 17.5V16.242C21.2047 15.4356 22 14.0614 22 12.5 22 11.3347 21.7076 10.2415 21.0587 9.34933 20.5486 8.64785 19.8511 8.11644 19 7.77422V6C19 3.79086 17.2091 2 15 2 14.2714 2 13.5883 2.19479 13 2.53513Z"></path></svg>
                </div>
                <div>Tools</div>
            </div>

            <div className="">
                <Tool name='Generate code' icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.7134 10.1281L17.4668 10.6938C17.2864 11.1079 16.7136 11.1079 16.5331 10.6938L16.2866 10.1281C15.8471 9.11947 15.0555 8.31641 14.0677 7.87708L13.308 7.53922C12.8973 7.35653 12.8973 6.75881 13.308 6.57612L14.0252 6.25714C15.0384 5.80651 15.8442 4.97373 16.2761 3.93083L16.5293 3.31953C16.7058 2.89349 17.2942 2.89349 17.4706 3.31953L17.7238 3.93083C18.1558 4.97373 18.9616 5.80651 19.9748 6.25714L20.6919 6.57612C21.1027 6.75881 21.1027 7.35653 20.6919 7.53922L19.9323 7.87708C18.9445 8.31641 18.1529 9.11947 17.7134 10.1281ZM2.82843 12.0001L7.07107 16.2428L5.65685 17.657L0 12.0001L5.65685 6.34326L7.07107 7.75748L2.82843 12.0001ZM18.3429 17.6572L23.9998 12.0003L21.1714 9.17188L19.7571 10.5861L21.1714 12.0003L16.9287 16.2429L18.3429 17.6572Z"></path></svg>}/>
                <Tool name='Code search' icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.6175 13.0317C17.7315 13.6424 16.6575 14 15.5 14C12.4624 14 10 11.5376 10 8.5C10 5.46243 12.4624 3 15.5 3C18.5376 3 21 5.46243 21 8.5C21 9.6575 20.6424 10.7315 20.0317 11.6175L22.7071 14.2929L21.2929 15.7071L18.6175 13.0317ZM3 4H8V6H3V4ZM3 11H8V13H3V11ZM3 18H21V20H3V18Z"></path></svg>}/>
                {/* <Tool name='' icon={}/>
                <Tool name='' icon={}/> */}
            </div>
                
        </div>
    )
}