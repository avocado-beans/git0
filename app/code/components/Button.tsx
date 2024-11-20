export default function Button(props: {'content':string, 'onClick'?: (...args: any[])=>void}) {
    return(
        <button className={`flex justify-center items-start group gap-2 border-2 border-zinc-900 hover:bg-slate-400 hover:text-black py-2 px-4 w-full md:w-fit rounded-lg text-slate-400 transition`} onClick={props.onClick}>
            <span className="text-nowrap">{props.content}</span> 
            <svg className="w-6 h-6 translate-y-px group-hover:-translate-y-0.5 transition" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path></svg>
        </button>
    )

}