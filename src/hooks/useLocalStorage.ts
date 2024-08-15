import { useState, useEffect } from 'react';


interface UseLocalStorageOptions<T> {
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
}

export function useLocalStorage<T>(
    key: string,
    options: UseLocalStorageOptions<T> = {}
): {
    value: T | null;
    setValue: (value: T) => void;
    removeValue: () => void;
} {
    const deserializer = (value: string) => {
        if (options.deserializer) {
            return options.deserializer(value);
        }
        if (value === 'undefined') {
            return undefined as unknown as T;
        }

        try {
            const parsed = JSON.parse(value);
            if (parsed !== null && typeof parsed === 'object') {
                return parsed as T;
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
        }
        return null;
    };

    const readValue = (): T | null => {
        if (typeof window === 'undefined') {
            throw new Error('useLocalStorage must be used within a browser');
        }
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                return deserializer(item);
            }
            return null;
        } catch (error) {
            console.warn(`Error reading ${key}:`, error);
            return null;
        }
    };


    const [storedValue, setStoredValue] = useState<T | null>(readValue());

    useEffect(() => {
        const serializer = (value: T) => {
            if (options.serializer) {
                return options.serializer(value);
            }
            return JSON.stringify(value);
        };

        const newValue = storedValue;
        if (newValue !== null) {
            try {
                window.localStorage.setItem(key, serializer(newValue));
            } catch (error) {
                console.warn(`Error setting ${key}:`, error);
            }
        }
    }, [key, storedValue, options]);

    const setValue = (value: T | null) => {
        try {
            setStoredValue(value !== undefined ? value : null);
        } catch (error) {
            console.warn(`Error updating ${key}:`, error);
        }
    };

    const removeValue = () => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(null);
        } catch (error) {
            console.warn(`Error removing ${key}:`, error);
        }
    };
    return {
        value: storedValue,
        setValue,
        removeValue
    };
}
