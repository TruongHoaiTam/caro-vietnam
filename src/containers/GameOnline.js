import { connect } from 'react-redux';
import GameOnline from "../components/GameOnline";
import { actInitState, actHandleClick, actJumpTo, actHandleSort, actPlayers, actSetAllowWin, actSetAllowDraw, actSetWin, actSetDraw } from '../actions/GameOnline'

const mapStateToProps = state => ({
    _history: state.GameOnline._history,
    stepNumber: state.GameOnline.stepNumber,
    xIsNext: state.GameOnline.xIsNext,
    reverse: state.GameOnline.reverse,
    players: state.GameOnline.players,

    allowWin: state.GameOnline.allowWin,
    allowDraw: state.GameOnline.allowDraw,

    username: state.Auth.username,
    usernames: state.GameOnline.usernames,

    win: state.GameOnline.win,
    draw: state.GameOnline.draw
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
    },

    actPlayers: (arr, usernames) => {
        dispatch(actPlayers(arr, usernames));
    },

    actSetAllowWin: () => {
        dispatch(actSetAllowWin())
    },

    actSetAllowDraw: () => {
        dispatch(actSetAllowDraw())
    },

    actSetWin: () => {
        dispatch(actSetWin())
    },

    actSetDraw: () => {
        dispatch(actSetDraw())
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(GameOnline);