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






