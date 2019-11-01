const defaultGame = {
    history: [
        {
            squares: Array(20 * 20).fill(null),
            pos: null,
            xIsNext: true,
            coordinates: null,
        }
    ],
    stepNumber: 0,
    reverse: false,
    xIsNext: true,
    bestPos: null
}

const game = (state = defaultGame, action) => {
    switch (action.type) {
        case 'INIT_STATE':
            state = defaultGame;
            return state;
        case 'HANDLE_CLICK':
            // eslint-disable-next-line no-case-declarations
            const nextSquares = action.value.squares.slice();
            nextSquares[action.value.bestPos] = "O";
            state = {
                ...state,
                history: action.value.history.slice(0, action.value.stepNumber + 1).concat([
                    {
                        squares: action.value.squares,
                        pos: action.value.i,
                        xIsNext: false,
                        coordinates: "(".concat(action.value.i % 20, ", ").concat(Math.floor(action.value.i / 20), ")")
                    },
                    {
                        squares: nextSquares,
                        pos: action.value.bestPos,
                        xIsNext: true,
                        coordinates: "(".concat(action.value.bestPos % 20, ", ").concat(Math.floor(action.value.bestPos / 20), ")")
                    }
                ]),
                stepNumber: action.value.history.length + 1,
                xIsNext: action.value.xIsNext,
                bestPos: action.value.bestPos
            }
            return state;
        case 'JUMP_TO':
            state = {
                ...state,
                stepNumber: action.step,
                xIsNext: action.step % 2 === 0
            }
            return state;
        case 'HANDLE_SORT':
            state = {
                ...state,
                reverse: !action.reverse
            }
            return state;
        default:
            return state;
    }
}

export default game;
