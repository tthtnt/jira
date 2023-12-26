import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // 这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number): V => {
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
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <P>(personsValue: P[]) => {
  const [value, setValue] = useState<P[]>(personsValue);

  const add = (param: P) => {
    setValue([...value, param]);
  };

  const removeIndex = (index: number) => {
    const newArray = [...value];
    newArray.splice(index, 1);

    setValue(newArray);
  };

  const clear = () => {
    setValue([]);
  };

  return {
    value,
    add,
    removeIndex,
    clear,
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // 使用useRef改变useHook闭包产生的问题, useRef返回一个可变的ref对象，其.current属性被初始化为传入的参数
  // 返回的ref对象在组件的整个生命周期内保持不变
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
