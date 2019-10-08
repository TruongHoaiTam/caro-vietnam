export const actChangeStepNumber = (step) => {
    return {
        type: 'CHANGE_STEP_NUMBER',
        step
    }
}

export const actDefaultStepNumber = () => {
    return {
        type: 'DEFAULT_STEP_NUMBER'
    }
}