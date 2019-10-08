const defaultState = false;

export const reverse = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_REVERSE':
            state = action.reverse;
            return state;
        case 'DEFAULT_REVERSE':
            return defaultState;
        default:
            return state;
    }
}
