import { useEffect, useState } from "react"

export const isFalsy = (value: any) => value === 0 ? false : !value

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key]
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}

export const useDebounce = (value: any, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    // 两种方法，一种timeout写在useEffect里面 一种使用useRef() 然后使用timeout.current
    // const timeout = useRef(null);
    // useEffect(() => {
    //     if (timeout.current) {
    //         clearTimeout(timeout.current)
    //     }
    //     timeout.current = setTimeout(() => {
    //         setDebouncedValue(value)
    //     }, delay)
    // }, [value, delay])

    
    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        // 每次在上一个useEffect处理完以后再运行
        return  () => clearTimeout(timeout)
    }, [value, delay])


    return debouncedValue
}