const defaultState = 0;

export const stepNumber = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_STEP_NUMBER':
            state = action.step;
            return state;
        case 'DEFAULT_STEP_NUMBER':
            state = defaultState;
            return state;
        default:
            return state;
    }
}
