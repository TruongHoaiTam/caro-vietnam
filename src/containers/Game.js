import { connect } from 'react-redux';
import Game from "../App"
import { actChangeNext, actXIsNext } from '../actions/xIsNext';
import { actChangeReverse, actDefaultReverse } from '../actions/reverse';
import { actChangeStepNumber, actDefaultStepNumber } from '../actions/stepNumber';
import { actConcatHistory, actDefaultHistory } from '../actions/history';

const mapStateToProps = state => ({
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext,
    reverse: state.reverse
});

const mapDispatchToProps = dispatch => ({
    actDefaultHistory: () => {
        dispatch(actDefaultHistory());
    },

    actDefaultStepNumber: () => {
        dispatch(actDefaultStepNumber());
    },

    actXIsNext: () => {
        dispatch(actXIsNext());
    },

    actDefaultReverse: () => {
        dispatch(actDefaultReverse());
    },

    actConcatHistory: (squares, i, xIsNext, stepNumber) => {
        dispatch(actConcatHistory(squares, i, xIsNext, stepNumber));
    },

    actChangeStepNumber: (step) => {
        dispatch(actChangeStepNumber(step));
    },

    actChangeNext: (value) => {
        dispatch(actChangeNext(value));
    },

    actChangeReverse: (value) => {
        dispatch(actChangeReverse(value));
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(Game);