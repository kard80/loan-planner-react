import { TextInputField } from 'evergreen-ui';
import { ChangeEvent } from 'react';
import { ParameterInput } from '../../types/serviceRequest';

interface prop {
    item: ParameterInput,
    value: string,
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function NumberInput({item, value, onInputChange}: prop) {
    return(
        <TextInputField type='number' label={item.label} step={item?.options?.step || 1} required={item.required}  value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}/>
    )
}
