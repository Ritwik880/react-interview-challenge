import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {

    const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;

    const [value, setValue] = useState(storedValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;
