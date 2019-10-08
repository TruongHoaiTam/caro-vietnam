const defaultState = [
    {
        squares: Array(20 * 20).fill(null),
        pos: null,
        xIsNext: true,
        coordinates: null
    }
]

export const history = (state = defaultState, action) => {
    switch (action.type) {
        case 'CONCAT_HISTORY':
            state = state.slice(0, action.stepNumber + 1);
            state = state.concat([
                {
                    squares: action.squares,
                    pos: action.i,
                    xIsNext: !action.xIsNext,
                    coordinates: "(".concat(action.i % 20, ", ").concat(Math.floor(action.i / 20), ")")
                }
            ])
            return state;
        case 'DEFAULT_HISTORY':
            state = defaultState;
            return state;
        default:
            return state;
    }
}
