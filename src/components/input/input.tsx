import { TextInputField } from 'evergreen-ui';
import { ChangeEvent, createRef, useEffect, useState } from 'react';
import { financeFormat, numberFormat } from '../../helpers/converter';
import { ParameterInput } from '../../types/serviceRequest';

interface numberInputProp {
    item: ParameterInput,
    value: string,
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function NumberInput({item, value, onInputChange}: numberInputProp) {
    return(
        <TextInputField
            type='number'
            label={item.label}
            step={item?.options?.step || 1}
            required={item.required} 
            value={value}
            min={item?.options?.min || 0}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}/>
    )
}

interface dynamicInputProp {
    value: string,
    returnValue: (input: string) => void
}
export function DynamicInput({ value, returnValue }: dynamicInputProp) {
    const inputEl = createRef<HTMLInputElement>();
    const [isInput, setIsInput] = useState(false);
    const [containValue, setContainValue] = useState(value);

    useEffect(() => {
       if (isInput && inputEl.current) {
           inputEl.current.focus();
       } 
    }, [isInput]);

    useEffect(() => {
        setContainValue(value);
     }, [value]);

    const onBlurInput = () => {
        setIsInput(false);
        const output = financeFormat(containValue);
        returnValue(output);
        setContainValue(output);
    }

    const onChangeInput = (input: string) => {
        setContainValue(input);
    }

    const onFocusInput = () => {
        const output = numberFormat(containValue);
        returnValue(output);
    }

    return(
        <div style={{cursor: 'pointer'}}>
            {isInput
            ? <TextInputField
                ref={inputEl}
                onBlur={() => onBlurInput()}
                value={containValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e.target.value)}
                onFocus={() => onFocusInput()}
                type='number'
                step={1000}
                min={0} />
            : <span onClick={() => setIsInput(true)}>{value}</span>}
        </div>
    )
}