// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(()=>{func(...args)}, delay)
    }
}