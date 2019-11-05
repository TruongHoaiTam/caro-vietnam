import { connect } from 'react-redux';
import Game from "../components/Game";
import { actInitState, actHandleClick, actJumpTo, actHandleSort } from '../actions/Game'

const mapStateToProps = state => ({
    _history: state.Game._history,
    stepNumber: state.Game.stepNumber,
    xIsNext: state.Game.xIsNext,
    reverse: state.Game.reverse,
    bestPos: state.Game.bestPos
});

const mapDispatchToProps = dispatch => ({

    actInitState: () => {
        dispatch(actInitState());
    },

    actHandleClick: (value) => {
        dispatch(actHandleClick(value));
    },

    actJumpTo: (step) => {
        dispatch(actJumpTo(step));
    },

    actHandleSort: (reverse) => {
        dispatch(actHandleSort(reverse));
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(Game);