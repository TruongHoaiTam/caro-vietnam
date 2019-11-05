import 'antd/dist/antd.css';
import React from 'react';
import {
    Link
} from "react-router-dom";
import { Button } from 'antd';
import Board from './Board';

const getLine = (pos, index) => {
    const lines = [
        [pos - 4, pos - 3, pos - 2, pos - 1, pos],
        [pos - 3, pos - 2, pos - 1, pos, pos + 1],
        [pos - 2, pos - 1, pos, pos + 1, pos + 2],
        [pos - 1, pos, pos + 1, pos + 2, pos + 3],
        [pos, pos + 1, pos + 2, pos + 3, pos + 4],
        [pos - 80, pos - 60, pos - 40, pos - 20, pos],
        [pos - 60, pos - 40, pos - 20, pos, pos + 20],
        [pos - 40, pos - 20, pos, pos + 20, pos + 40],
        [pos - 20, pos, pos + 20, pos + 40, pos + 60],
        [pos, pos + 20, pos + 40, pos + 60, pos + 80],
        [pos - 76, pos - 57, pos - 38, pos - 19, pos],
        [pos - 57, pos - 38, pos - 19, pos, pos + 19],
        [pos - 38, pos - 19, pos, pos + 19, pos + 38],
        [pos - 19, pos, pos + 19, pos + 38, pos + 57],
        [pos, pos + 19, pos + 38, pos + 57, pos + 76],
        [pos - 84, pos - 63, pos - 42, pos - 21, pos],
        [pos - 63, pos - 42, pos - 21, pos, pos + 21],
        [pos - 42, pos - 21, pos, pos + 21, pos + 42],
        [pos - 21, pos, pos + 21, pos + 42, pos + 63],
        [pos, pos + 21, pos + 42, pos + 63, pos + 84]
    ];
    return lines[index];
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        const { actInitState } = this.props;
        actInitState();
        this.winningLine = null;
        this.winningPos = null;
        this.stepChoose = 0;
    }

    getAllIndexes(arr) {
        let minD = 19; let minC = 19; let maxD = 0; let maxC = 0;
        const indexes = [];
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i] === "X") {
                indexes.push(i);
                if (i % 20 < minD) minD = i % 20;
                if (Math.floor(i / 20) < minC) minC = Math.floor(i / 20);
                if (i % 20 > maxD) maxD = i % 20; // 3
                if (Math.floor(i / 20) > maxC) maxC = Math.floor(i / 20);
            }
        }
        let begin;
        let end;
        const min = minC * 20 + minD;
        const max = maxC * 20 + maxD;
        if (min % 20 >= 1) {
            if (min / 20 >= 1) {
                begin = min - 21;
            } else {
                begin = min - 1;
            }
        } else if (min / 20 >= 1) {
            begin = min - 20;
        } else {
            begin = 0;
        }

        if (max % 20 <= 18) {
            if (max / 20 <= 18) {
                end = max + 21;
            } else {
                end = max + 1;
            }
        } else if (max / 20 <= 18) {
            end = max + 20;
        } else {
            end = 399;
        }

        return {
            indexes,
            begin,
            end
        }
    }

    handlePlayAgain() {
        const { actInitState } = this.props;
        actInitState();
        this.winningLine = null;
        this.winningPos = null;
        this.stepChoose = 0;
    }

    handleClick(i) {
        const { stepNumber, xIsNext } = this.props;
        let { _history } = this.props;
        _history = _history.slice(0, stepNumber + 1);


        const current = _history[_history.length - 1];
        const squares = current.squares.slice();
        const winning = this.calculateWinner(squares, current.pos);
        if ((winning && winning[0]) || squares[i]) {
            return;
        }

        if (_history.length > 2) {
            const beforeCurrent = _history[_history.length - 2];
            const beforeSquares = current.squares.slice();
            const beforeWinning = this.calculateWinner(beforeSquares, beforeCurrent.pos);
            if ((beforeWinning && beforeWinning[0])) {
                return;
            }
        }


        squares[i] = xIsNext ? 'X' : 'O';
        const { actHandleClick } = this.props;
        const board = squares.slice();

        const bestPos = this.findBestMove(board); //

        actHandleClick({
            squares, i, xIsNext, stepNumber, _history, bestPos//
        });
        this.stepChoose = _history.length + 1;
    }

    listTraverse(values) {
        const list = [];
        for (let i = values.begin; i <= values.end; i += 1) {
            if (i % 20 >= values.begin % 20 && i % 20 <= values.end % 20 && values.indexes.indexOf(i) === -1) {
                list.push(i);
            }
        }
        return list;
    }

    findBestMove(board) {
        const list = this.listTraverse(this.getAllIndexes(board));
        let random;
        do {
            random = Math.floor(Math.random() * list.length);
        } while (board[list[random]] === "O")
        return list[random];
    }


    jumpTo(step) {
        if (step % 2 === 0) {
            const { actJumpTo } = this.props;
            actJumpTo(step);
            this.winningLine = null;
            this.winningPos = null;
            this.stepChoose = step;
        }
    }

    calculateWinner(squares, pos) {
        const lines = [
            [pos - 4, pos - 3, pos - 2, pos - 1, pos],
            [pos - 3, pos - 2, pos - 1, pos, pos + 1],
            [pos - 2, pos - 1, pos, pos + 1, pos + 2],
            [pos - 1, pos, pos + 1, pos + 2, pos + 3],
            [pos, pos + 1, pos + 2, pos + 3, pos + 4],
            [pos - 80, pos - 60, pos - 40, pos - 20, pos],
            [pos - 60, pos - 40, pos - 20, pos, pos + 20],
            [pos - 40, pos - 20, pos, pos + 20, pos + 40],
            [pos - 20, pos, pos + 20, pos + 40, pos + 60],
            [pos, pos + 20, pos + 40, pos + 60, pos + 80],
            [pos - 76, pos - 57, pos - 38, pos - 19, pos],
            [pos - 57, pos - 38, pos - 19, pos, pos + 19],
            [pos - 38, pos - 19, pos, pos + 19, pos + 38],
            [pos - 19, pos, pos + 19, pos + 38, pos + 57],
            [pos, pos + 19, pos + 38, pos + 57, pos + 76],
            [pos - 84, pos - 63, pos - 42, pos - 21, pos],
            [pos - 63, pos - 42, pos - 21, pos, pos + 21],
            [pos - 42, pos - 21, pos, pos + 21, pos + 42],
            [pos - 21, pos, pos + 21, pos + 42, pos + 63],
            [pos, pos + 21, pos + 42, pos + 63, pos + 84]
        ];
        for (let i = 0; i < lines.length; i += 1) {
            const [a, b, c, d, e] = lines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c] &&
                squares[a] === squares[d] &&
                squares[a] === squares[e]
            ) {
                if (i < 5) {
                    let j = lines[i][0] - 1;
                    let check = 0;
                    while (j >= pos - (pos % 20)) {
                        if (squares[j] && squares[j] !== squares[a]) {
                            check = 1;
                            break;
                        }
                        j -= 1;
                    }
                    if (check === 1) {
                        let k = lines[i][4] + 1;
                        while (k < pos + 20 - (pos % 20)) {
                            if (squares[k] && squares[k] !== squares[a]) {
                                return null;
                            }
                            k += 1;
                        }
                    }
                } else if (i >= 5 && i < 10) {
                    let j = lines[i][0] - 20;
                    let check = 0;
                    while (j >= 0) {
                        if (squares[j] && squares[j] !== squares[a]) {
                            check = 1;
                            break;
                        }
                        j -= 20;
                    }
                    if (check === 1) {
                        let k = lines[i][4] + 20;
                        while (k < 400) {
                            if (squares[k] && squares[k] !== squares[a]) {
                                return null;
                            }
                            k += 20;
                        }
                    }
                } else if (i >= 10 && i < 15) {
                    let j = lines[i][0] - 19;
                    let check = 0;
                    while (j >= 0) {
                        if (squares[j] && squares[j] !== squares[a]) {
                            check = 1;
                            break;
                        }
                        j -= 19;
                    }
                    if (check === 1) {
                        let k = lines[i][4] + 19;
                        while (k < 400) {
                            if (squares[k] && squares[k] !== squares[a]) {
                                return null;
                            }
                            k += 19;
                        }
                    }
                } else if (i < 20) {
                    let j = lines[i][0] - 21;
                    let check = 0;
                    while (j >= 0) {
                        if (squares[j] && squares[j] !== squares[a]) {
                            check = 1;
                            break;
                        }
                        j -= 21;
                    }
                    if (check === 1) {
                        let k = lines[i][4] + 21;
                        while (k < 400) {
                            if (squares[k] && squares[k] !== squares[a]) {
                                return null;
                            }
                            k += 21;
                        }
                    }
                }
                this.winningLine = i;
                this.winningPos = getLine(pos, i);
                return [squares[a], i];
            }
        }
        return null;
    }

    handleSort() {
        const { reverse, actHandleSort } = this.props;
        actHandleSort(reverse);
    }


    render() {
        const { stepNumber, reverse, xIsNext } = this.props;
        let { _history } = this.props;

        let current;
        if (_history.length >= 2) {

            const beforeCurrent = _history[stepNumber - 1];
            const beforeWinner = this.calculateWinner(beforeCurrent.squares, beforeCurrent.pos);

            if (beforeWinner) {
                _history = _history.slice(0, -1);
                current = _history[stepNumber - 1];
            } else {
                current = _history[stepNumber];
            }
        } else {
            current = _history[stepNumber];
        }
        const winner = this.calculateWinner(current.squares, current.pos);

        let move = _history.map((step, _move) => {
            const desc = _move
                ? (step.xIsNext ? 'O ' : 'X ') + step.coordinates
                : 'Go to game start';
            if (this.stepChoose === _move) {
                return (
                    <li key={_move.toString()}>
                        <Button
                            size="large" shape="round"
                            className="btnHistory"
                            onClick={() => this.jumpTo(_move)}
                        >
                            <b className="fa fa-bold" aria-hidden="true">
                                {desc}
                            </b>
                        </Button>
                    </li>
                );
            }
            return (
                <li key={_move.toString()}>
                    <Button
                        size="large" shape="round"
                        className="btnHistory"
                        onClick={() => this.jumpTo(_move)}>{desc}
                    </Button>
                </li>
            );
        });
        if (reverse === true) move = move.reverse();

        let status;
        if (winner) {
            status = `Winner: ${winner[0]}`;
        } else {
            status = `Next player: ${xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div
                className="container-login100"
                style={{ backgroundColor: '#282c34' }}
            >
                <div className="game-info">
                    <p className="title">Game Caro</p>
                    <p>{status}</p>
                    <Button
                        type="primary" size="large" shape="round"
                    >
                        <Link to="/">Home</Link>
                    </Button>
                    <Button
                        type="danger" size="large" shape="round"
                        onClick={() => this.handlePlayAgain()}
                    >
                        Play again
                    </Button>
                </div>
                <div className="game">
                    <Board
                        squares={current.squares}
                        isChoose={current.pos}
                        winningLine={this.winningLine}
                        winningPos={this.winningPos}
                        onClick={i => this.handleClick(i)}
                    />
                </div>

                <div className="divhistory">
                    <div className="divhistory1">
                        <p>&nbsp;&nbsp;History</p>
                        <Button
                            className="btnSort"
                            type="primary"
                            size="large"
                            onClick={() => this.handleSort()}
                        >
                            Sort
                            </Button>
                    </div>
                    <div className="history">
                        <ol>{move}</ol>
                    </div>
                </div>
            </div >
        );
    }
}

export default Game;






