const defaultState = true;

export const xIsNext = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_NEXT':
            state = action.isNext;
            return state;
        case 'X_IS_NEXT':
            return true;
        default:
            return state;
    }
}
