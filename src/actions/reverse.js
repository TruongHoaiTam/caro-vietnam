export const actChangeReverse = (reverse) => {
    return {
        type: 'CHANGE_REVERSE',
        reverse
    }
}

export const actDefaultReverse = () => {
    return {
        type: 'DEFAULT_REVERSE'
    }
}