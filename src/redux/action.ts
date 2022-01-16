export const SHOW_SPINNER = 'SHOW_SPINNER';
export const HIDE_SPINNER = 'HIDE_SPINNER';

export function spinnerAction(action: boolean): {type: string} {
    const result = action ? SHOW_SPINNER : HIDE_SPINNER;
    return {type: result}
}