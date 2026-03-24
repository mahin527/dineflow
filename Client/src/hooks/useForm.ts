import { useState, type ChangeEvent } from "react";

export function useForm<T extends Record<string, any>>(initialState: T) {
    const [input, setInput] = useState<T>(initialState);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));

        // console.log(name, value);

    };

    return { input, handleInputChange, setInput };
}