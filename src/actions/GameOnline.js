export const actInitState = () => {
    return {
        type: 'INIT_STATE'
    }
}

export const actHandleClick = (value) => {
    return {
        type: 'HANDLE_CLICK',
        value
    }
}

export const actJumpTo = (step) => {
    return {
        type: 'JUMP_TO',
        step
    }
}

export const actHandleSort = (reverse) => {
    return {
        type: 'HANDLE_SORT',
        reverse
    }
}

export const actPlayers = (arr, usernames) => {
    return {
        type: 'PLAYERS',
        arr,
        usernames
    }
}

export const actSetAllowWin = () => {
    return {
        type: 'SET_ALLOW_WIN'
    }
}

export const actSetAllowDraw = () => {
    return {
        type: 'SET_ALLOW_DRAW'
    }
}

export const actSetWin = () => {
    return {
        type: 'SET_WIN'
    }
}

export const actSetDraw = () => {
    return {
        type: 'SET_DRAW'
    }
}







