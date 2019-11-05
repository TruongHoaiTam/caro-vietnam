const defaultGame = {
    _history: [
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
    whoIsNext: null,
    players: null,

    allowWin: false,
    allowDraw: false,

    usernames: null,
    win: false,
    draw: false
}

const gameOnline = (state = defaultGame, action) => {
    switch (action.type) {
        case 'INIT_STATE':
            state = defaultGame;
            return state;
        case 'HANDLE_CLICK':
            // eslint-disable-next-line no-case-declarations
            state = {
                ...state,
                _history: action.value._history.slice(0, action.value.stepNumber + 1).concat([
                    {
                        squares: action.value.squares,
                        pos: action.value.i,
                        xIsNext: !action.value.xIsNext,
                        coordinates: "(".concat(action.value.i % 20, ", ").concat(Math.floor(action.value.i / 20), ")")
                    }
                ]),
                stepNumber: action.value._history.length,
                xIsNext: !action.value.xIsNext
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
        case 'PLAYERS':
            state = {
                ...state,
                players: action.arr,
                usernames: action.usernames
            }
            return state;
        case 'SET_ALLOW_WIN':
            state = {
                ...state,
                allowWin: true
            }
            return state;
        case 'SET_ALLOW_DRAW':
            state = {
                ...state,
                allowDraw: true
            }
            return state;
        case 'SET_WIN':
            state = {
                ...state,
                win: true
            }
            return state;
        case 'SET_DRAW':
            state = {
                ...state,
                draw: true
            }
            return state;
        default:
            return state;
    }
}

export default gameOnline;
