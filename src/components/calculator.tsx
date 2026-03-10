import ButtonPanel from "./buttonPanel";
import Display from "./display";
import { useState } from "react";

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState("");

    function handleButtonClick(text: string) {
        const MAX_LENGTH = 21;
        if (displayValue === "Overflow" || displayValue === "Error") {
            setDisplayValue("");
        }
        if (text === "C") {
            setDisplayValue("");
        } else if (text === "=") {
            try {
                // eslint-disable-next-line no-eval
                const result = eval(displayValue);
                if (result.length > MAX_LENGTH) {
                    setDisplayValue("Overflow");
                    return;
                }
                setDisplayValue(String(result));
            } catch (error) {
                setDisplayValue("Error");
            }
        } else {
            if (displayValue.length >= MAX_LENGTH) {
                return;
            }
            setDisplayValue(prevValue => prevValue + text);
        }
    }
    return (
        <div className="w-86 mx-auto p-5 bg-gray-200 rounded-lg shadow-lg">
            <Display value={displayValue} />
            <ButtonPanel onClick={handleButtonClick} />
        </div>
    );
}

export default Calculator;