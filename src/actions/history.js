export const actConcatHistory = (squares, i, xIsNext, stepNumber) => {
    return {
        type: 'CONCAT_HISTORY',
        squares,
        i,
        xIsNext,
        stepNumber
    }
}


export const actDefaultHistory = (squares, i, xIsNext) => {
    return {
        type: 'DEFAULT_HISTORY',
        squares,
        i,
        xIsNext
    }
}