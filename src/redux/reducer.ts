import { PayloadAction } from '@reduxjs/toolkit'
import { SHOW_SPINNER, HIDE_SPINNER } from './action';

const initialState = {
    showSpinner: false
}

function reducer(state = initialState, action: PayloadAction<string>) {
    switch (action.type) {
        case SHOW_SPINNER:
            return { showSpinner: true };
        case HIDE_SPINNER:
            return { showSpinner: false };
        default:
            return state;
    }
}

export default reducer