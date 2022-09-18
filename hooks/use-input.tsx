import React, { useCallback, useState } from "react";

const useInput = (defaultValue?: string) => {
    const [enteredValue, setEnteredValue] = useState(defaultValue || "");
    const valueChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setEnteredValue(event.target.value);
        },
        []
    );

    const reset = useCallback((content?: string) => {
        setEnteredValue(content || "");
    }, []);

    return {
        value: enteredValue,
        valueChangeHandler,
        reset,
    };
};

export default useInput;
